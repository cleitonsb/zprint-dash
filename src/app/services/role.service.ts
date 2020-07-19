import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {PermissionService} from "./permission.service";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient, private permissionService: PermissionService) { }

  public getAll() {
    return this.http.get(environment.apiUrl + '/perfis');
  }

  public getPermissions() {
    return this.permissionService.getAll();
  }

  public get(id : number = null) {
    if(id === null) return;
    return this.http.get(environment.apiUrl + '/perfil/' + id);
  }

  public store(data) {
    return this.http.post(environment.apiUrl + '/perfil', data, {observe: 'response'});
  }

  public delete(id) {
    if(id === null) return;
    return this.http.delete(environment.apiUrl + '/perfil/' + id, {observe: 'response'});
  }
}
