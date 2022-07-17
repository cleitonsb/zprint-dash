import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ClockService {

  constructor(private http: HttpClient) { }

  public getByUser(usuario, mes, ano) {
    var param = (mes != null) ? '/' + mes : '';
    param = param + ((ano != null) ? '/' + ano : '');
    return this.http.get(environment.config.apiUrl + '/ponto/lista/' + usuario + param);
  }

  public autorizar(id) {
    return this.http.get(environment.config.apiUrl + '/ponto/autorizar/' + id, {observe: 'response'});
  }


}
