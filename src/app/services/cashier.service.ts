import { DateFunctions } from './../helpers/date.functions';
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

  public getItems(id: number = null) {
    if (id === null) { return; }
    return this.http.get(environment.apiUrl + '/caixa/items/' + id);
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

  // public getRel(dataIni: String = '', dataFim: String = '') { console.log(dataIni);



  //   const d = new Date();

  //   let df = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
  //   d.setDate(d.getMonth() - 1);
  //   let di = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

  //   let param = '/' + ((dataIni !== '') ? dataIni : di);
  //       param = param + '/' + ((dataFim !== '') ? dataFim : df);

  //   return this.http.get(environment.apiUrl + '/caixa/rel' + param);
  // }

  public getRel(dataIni: String, dataFim: String) { console.log(dataIni);
    return this.http.get(environment.apiUrl + '/caixa/relatorio/dataini/' + dataIni + '/datafim/' + dataFim);
  }
}
