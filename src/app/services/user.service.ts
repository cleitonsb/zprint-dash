import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getAll(page : number = 1) {
    return this.http.get(`${environment.apiUrl}/users?page=${page}`)
  }
}
