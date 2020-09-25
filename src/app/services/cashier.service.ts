import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CashierService {

  constructor(private http: HttpClient) { }

  public getAll(param, page: number = 1) {
    return this.http.get(environment.apiUrl + '/caixa/page/' + page + param);
  }

  public getByParam(param) {
    return this.http.get(environment.apiUrl + '/caixa/busca/' + param);
  }

  public get(id: number = null) {
    if (id === null) { return; }
    return this.http.get(environment.apiUrl + '/caixa/' + id);
  }

  public getOpen() {
    return this.http.get(environment.apiUrl + '/caixa/aberto');
  }

  public store(data) {
    return this.http.post(environment.apiUrl + '/caixa', data, {observe: 'response'});
  }

  public close(data) {
    return this.http.post(environment.apiUrl + '/caixa/fechar', data, {observe: 'response'});
  }

  public delete(id) {
    if (id === null) { return; }
    return this.http.get(environment.apiUrl + '/caixa/remove/' + id, {observe: 'response'});
  }
}
