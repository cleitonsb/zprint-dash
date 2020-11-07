import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  public getAll(param, page: number = 1) {
    return this.http.get(environment.apiUrl + '/servico/page/' + page + param);
  }

  public getByParam(param?) {
    return this.http.get(environment.apiUrl + '/servico/busca/' + param);
  }

  public getByCaixa(param?) {
    return this.http.get(environment.apiUrl + '/servico/caixa/' + param);
  }

  public get(id: number = null) {
    if (id === null) { return; }
    return this.http.get(environment.apiUrl + '/servico/' + id);
  }

  public store(data) {
    return this.http.post(environment.apiUrl + '/servico', data, {observe: 'response'});
  }

  public update(data) {
    return this.http.post(environment.apiUrl + '/servico/update', data, {observe: 'response'});
  }

  public delete(id) {
    if (id === null) { return; }
    return this.http.get(environment.apiUrl + '/servico/remove/' + id, {observe: 'response'});
  }
}
