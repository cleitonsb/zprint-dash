import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

import {NotificationService} from './notification.service';
import {NgxSpinnerService} from 'ngx-spinner';
import { DateFunctions } from '../helpers/date.functions';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private msg: NotificationService,
    private spinner: NgxSpinnerService,
    private date: DateFunctions
  ) { }

  public getAll(param, page: number = 1) {
    return this.http.get(environment.apiUrl + '/usuario/page/' + page + param);
  }

  public get(id: number = null) {
    if (id === null) { return; }
    return this.http.get(environment.apiUrl + '/usuario/' + id);
  }

  public getByParam(param?) {
    let busca = '';
    if (param !== undefined) {
      busca = '/busca/' + param;
    }
    return this.http.get(environment.apiUrl + '/usuario' + busca);
  }

  public getByEmail(email: string = null) {
    if (email === null) { return; }
    return this.http.get(environment.apiUrl + '/usuario/' + email + '/email');
  }

  public store(data) {
    return this.http.post(environment.apiUrl + '/usuario', data, {observe: 'response'});
  }

  public upload(avatar, usuarioid) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    const formData = new FormData();

    if (avatar) {
      formData.append('avatar', avatar);
      formData.append('usuarioid', usuarioid);
    }

    return this.http.post(environment.apiUrl + '/usuario/upload', formData, {
      observe: 'response',
      headers: headers
    });

  }

  public delete(id) {
    if (id === null) { return; }
    return this.http.get(environment.apiUrl + '/usuario/remove/' + id, {observe: 'response'});
  }

  public storePass(usuarioid: number, pass: string) {
    if (usuarioid === null || pass === null) { return; }
    
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');

    const formData = new FormData();

    formData.append('senha', pass);
    formData.append('id', usuarioid+"");

    return this.http.post(environment.apiUrl + '/usuario/senha', formData, {
      observe: 'response',
      headers: headers
    });
  }
}
