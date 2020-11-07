import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentBillService {

  constructor(private http: HttpClient) { }

  public getAll(param, page: number = 1) {
    return this.http.get(environment.apiUrl + '/conta/page/' + page + param);
  }

  public getByParam(param?) {
    return this.http.get(environment.apiUrl + '/conta/busca/' + param);
  }

  public getByCaixa(param?) {
    return this.http.get(environment.apiUrl + '/conta/caixa/' + param);
  }

  public get(id: number = null) {
    if (id === null) { return; }
    return this.http.get(environment.apiUrl + '/conta/' + id);
  }

  public store(data) {
    return this.http.post(environment.apiUrl + '/conta', data, {observe: 'response'});
  }

  public update(data) {
    return this.http.post(environment.apiUrl + '/conta', data, {observe: 'response'});
  }

  public delete(id) {
    if (id === null) { return; }
    return this.http.get(environment.apiUrl + '/conta/remove/' + id, {observe: 'response'});
  }

}
