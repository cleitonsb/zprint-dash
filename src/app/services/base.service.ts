import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
    this.configService.get('apiUrl').pipe(
      switchMap(
        (apiUrl: string) => {
          localStorage.setItem('apiUrl', apiUrl);
          return apiUrl;
        }
      )
    ).subscribe(() => this.spinner.hide());

    this.configService.get('frontUrl').pipe(
      switchMap(
        (apiUrl: string) => {
          localStorage.setItem('frontUrl', apiUrl);
          return apiUrl;
        }
      )
    ).subscribe(() => this.spinner.hide());
  }

}
