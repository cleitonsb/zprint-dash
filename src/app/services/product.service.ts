import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getAll(param, page: number = 1) {
    return this.http.get(environment.apiUrl + '/produto/page/' + page + param);
  }

  public getByParam(param?) {
    let busca = '';
    if (param) {
      busca = '/busca/' + param;
    }
    return this.http.get(environment.apiUrl + '/produto' + busca);
  }

  public get(id: number = null) {
    if (id === null) { return; }
    return this.http.get(environment.apiUrl + '/produto/' + id);
  }

  public store(data) {
    return this.http.post(environment.apiUrl + '/produto', data, {observe: 'response'});
  }

  public delete(id) {
    if (id === null) { return; }
    return this.http.get(environment.apiUrl + '/produto/remove/' + id, {observe: 'response'});
  }
}
