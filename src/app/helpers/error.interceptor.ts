import { environment } from './../../environments/environment';
import { msg } from './../variables/msg';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {catchError} from 'rxjs/operators';
import {NotificationService} from '../services/notification.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService,
    private msgNotificacao: NotificationService,
    private spinner: NgxSpinnerService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError((err) => {

      let errosString = '';

      if (err.status === 401) {
        if (err.url === environment.config.apiUrl + '/login') {
          errosString = msg.E002;
        } else {
          this.authenticationService.logout();
          location.reload();
        }
      } else if (err.status === 403) {
        errosString = msg.E403;
      } else if (err.status === 0) {
        errosString = msg.E001;
      } else {

        if (err.error.errors) {
          const erros = Object.entries(err.error.errors);

          erros.forEach(function (value) {
            errosString += value[1] + '<br>';
          });
        } else {
          errosString = err.error.message;
        }
      }

      if (errosString !== '') {
        this.msgNotificacao.error(errosString, 'Erro ' + err.status);
      }

      const error = errosString || err.error.message || err.statusText;
      this.spinner.hide();
      return throwError(error);
    }));
  }
}
