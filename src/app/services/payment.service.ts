import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  public getByCashier(idCaixa: Number) {
    return this.http.get(environment.config.apiUrl + '/pagamento/' + idCaixa);
  }

}
