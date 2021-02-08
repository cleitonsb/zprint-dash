import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) { }

  public getAll(param, page: number = 1) {
    return this.http.get(environment.apiUrl + '/venda/page/' + page + param);
  }

  public getByParam(param?) {
    return this.http.get(environment.apiUrl + '/venda/busca/' + param);
  }

  public getByCaixa(param?) {
    return this.http.get(environment.apiUrl + '/venda/caixa/' + param);
  }

  public get(id: number = null) {
    if (id === null) { return; }
    return this.http.get(environment.apiUrl + '/venda/' + id);
  }

  public store(data) {
    return this.http.post(environment.apiUrl + '/venda', data, {observe: 'response'});
  }

  public update(data) {
    return this.http.post(environment.apiUrl + '/venda/update', data, {observe: 'response'});
  }

  public delete(id, usuario, senha) {

    const formData = new FormData();
    
    formData.append('id', id);
    formData.append('usuario', usuario);
    formData.append('senha', senha);

    return this.http.post(environment.apiUrl + '/venda/remove', formData, {observe: 'response'});
  }
}
