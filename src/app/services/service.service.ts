import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  public getAll(page : number = 1) {
    return this.http.get(environment.apiUrl + '/servicos?page=' + page);
  }

  public get(id : number = null) {
    if(id === null) return;
    return this.http.get(environment.apiUrl + '/servico/' + id);
  }

  public store(data) {
    this.http.post(environment.apiUrl + '/servico', data).subscribe();
  }
}
