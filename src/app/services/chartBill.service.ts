import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChartBillService {

  constructor(private http: HttpClient) { }

  public getAll(param, page: number = 1) {
    return this.http.get(environment.config.apiUrl + '/planoconta/page/' + page + param);
  }

  public getByParam(param?) {
    let busca = '';
    if (param !== undefined) {
      busca = '/busca/' + param;
    }
    return this.http.get(environment.config.apiUrl + '/planoconta' + busca);
  }

  public get(id: number = null) {
    if (id === null) { return; }
    return this.http.get(environment.config.apiUrl + '/planoconta/' + id);
  }

  public store(data) {
    return this.http.post(environment.config.apiUrl + '/planoconta', data, {observe: 'response'});
  }

  public update(data) {
    return this.http.post(environment.config.apiUrl + '/planoconta/update', data, {observe: 'response'});
  }

  public delete(id) {
    if (id === null) { return; }
    return this.http.get(environment.config.apiUrl + '/planoconta/remove/' + id, {observe: 'response'});
  }

}
