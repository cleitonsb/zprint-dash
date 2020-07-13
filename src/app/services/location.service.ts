import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getEstates() {
    return this.http.get(environment.apiUrl + '/estados');
  }

  getCities(estate_id: number = null) {
    if(estate_id == null) return;
    return this.http.get(environment.apiUrl + '/cidades/' + estate_id);
  }
}
