import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private http: HttpClient,
  ) { }

  public getAll(param, page: number = 1) {
    return this.http.get(environment.config.apiUrl + '/pessoa/page/' + page + param);
  }

  public getByParam(param?) {
    let busca = '';
    if (param !== undefined) {
      busca = '/busca/' + param;
    }
    return this.http.get(environment.config.apiUrl + '/pessoa' + busca);
  }

  public get(id: number = null) {
    if (id === null) { return; }
    return this.http.get(environment.config.apiUrl + '/pessoa/' + id);
  }

  public store(data) {
    return this.http.post(environment.config.apiUrl + '/pessoa', data, {observe: 'response'});
  }

  public delete(id) {
    if (id === null) { return; }
    return this.http.get(environment.config.apiUrl + '/pessoa/remove/' + id, {observe: 'response'});
  }
}
