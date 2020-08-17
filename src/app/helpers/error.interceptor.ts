import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";
import {catchError} from "rxjs/operators";
import {NotificationService} from "../services/notification.service";
import {NgxSpinnerService} from "ngx-spinner";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService, private msg: NotificationService, private spinner: NgxSpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      let errosString = '';
console.log(err);

      if(err.status == 401){
        this.authenticationService.logout();
        location.reload(true);
      }else{
        if(err.error.errors){
          let erros = Object.entries(err.error.errors);

          erros.forEach(function (value) {
            errosString += value[1] + '<br>';
          });
        }else{
          errosString = err.error.message;
        }

        this.msg.error(errosString, 'Erro ' + err.status);
      }

      const error = err.error.message || err.statusText;
      this.spinner.hide();
      return throwError(error);
    }));
  }
}
