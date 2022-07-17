import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  public getAll(param, page: number = 1) {
    return this.http.get(environment.config.apiUrl + '/servico/page/' + page + param);
  }

  public getByParam(param?) {
    return this.http.get(environment.config.apiUrl + '/servico/busca/' + param);
  }

  public getByCaixa(param?) {
    return this.http.get(environment.config.apiUrl + '/servico/caixa/' + param);
  }

  public get(id: number = null) {
    if (id === null) { return; }
    return this.http.get(environment.config.apiUrl + '/servico/' + id);
  }

  public store(data) {
    data = this.formatarServico(data);
    return this.http.post(environment.config.apiUrl + '/servico', data, {observe: 'response'});
  }

  private formatarServico(servico){
    /** limpa IDs registros novos */
    if(servico.pessoa.id == -1) {
      servico.pessoa.id = null;
    }

    if(servico.equipamento.id == -1) {
      servico.equipamento.id = null;
    }

    if(servico.equipamento.id == 0) {
      servico.equipamento.id  = null;
    }

    return servico;
  }

  public update(data) {
    return this.http.post(environment.config.apiUrl + '/servico/update', data, {observe: 'response'});
  }

  public delete(id, usuario, senha) {

    const formData = new FormData();

    formData.append('id', id);
    formData.append('usuario', usuario);
    formData.append('senha', senha);

    return this.http.post(environment.config.apiUrl + '/servico/remove', formData, {observe: 'response'});
  }
}
