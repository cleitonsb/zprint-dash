import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private http: HttpClient) { }

  public getByPerson(idPessoa: Number) {
    return this.http.get(environment.config.apiUrl + '/equipamento/' + idPessoa);
  }

}
