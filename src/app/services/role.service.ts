import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get(environment.apiUrl + '/perfis');
  }

  public get(id : number = null) {
    if(id === null) return;
    return this.http.get(environment.apiUrl + '/perfil/' + id);
  }

  public store(data) {
    this.http.post(environment.apiUrl + '/perfil', data).subscribe();
  }
}
