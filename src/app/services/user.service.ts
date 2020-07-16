import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

import {NotificationService} from "./notification.service";
import {NgxSpinnerService} from "ngx-spinner";
import { DateFunctions } from "../helpers/date.functions";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private msg: NotificationService, private spinner: NgxSpinnerService, private date: DateFunctions) { }

  public getAll(param, page : number = 1) {
    return this.http.get(environment.apiUrl + '/users' + param + '?page=' + page);
  }

  public get(id : number = null) {
    if(id === null) return;
    return this.http.get(environment.apiUrl + '/user/' + id);
  }

  public store(data, arquivo) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    var formData = new FormData();
    if(arquivo) {
      formData.append('avatar', arquivo);
    }

    if(data['dt_nasc']) {
      data['dt_nasc'] = this.date.formatByString(data['dt_nasc'])
    }

    if(data.id) {
      formData.append('_method', 'put');
    }

    return this.http.post(environment.apiUrl + '/user', this.formData(formData, data), {
      observe: 'response',
      headers: headers
    });
  }

  private formData(formData, data, objectIndex?) {
    for(var index in data){
      if(typeof data[index] == 'object' && index != 'avatar'){
        this.formData(formData, data[index], index)
      }else {
        let campo = 'usuario[' + index + ']';
        if(objectIndex){
          campo = objectIndex + '[' + index + ']';
        }
        formData.append(campo, data[index]);
      }
    }

    return formData;
  }

  public delete(id) {
    if(id === null) return;
    return this.http.delete(environment.apiUrl + '/user/' + id);
  }
}
