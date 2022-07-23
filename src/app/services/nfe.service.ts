import { DateFunctions } from './../helpers/date.functions';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NfeService {

  constructor(private http: HttpClient) { }

  public getByCashier(idCaixa: Number) {
    return this.http.get(environment.config.apiUrl + '/pagamento/' + idCaixa);
  }

  public generate(conta, venda) {
    // return this.http.get(environment.config.apiUrl + '/nfe/venda/' + venda.id + '/cpf/' + venda.cpf);
    return this.http.get(environment.config.apiUrl + '/nfe/venda/13/cpf/95782354100');

    console.log(conta);
    console.log(venda);

    let arrProdutos = []
    venda.itensVenda.forEach(element => {
      let objItemVenda = {
        "nome": element.produto.nome,
        "codigo": element.produto.id,
        "ncm": "0000.00.00",
        "quantidade": element.qt,
        "unidade": "UN",
        "origem": 0,
        "subtotal": element.produto.preco,
        "total": element.preco,
        "classe_imposto": "REF13329388",
     }

     arrProdutos.push(objItemVenda);
    });

    const json = JSON.stringify({
      "ID": 3,
      "operacao": 1,
      "natureza_operacao": "Prestacaoo de servico",
      "modelo": 2,
      "finalidade": 1,
      "ambiente": 2,
      // "cliente": {
      //    "cpf": "000.000.000-00",
      //    "nome_completo": "Nome do Cliente",
      //    "endereco": "Av. Brg. Faria Lima",
      //    "complemento": "Escritório",
      //    "numero": 1000,
      //    "bairro": "Itaim Bibi",
      //    "cidade": "São Paulo",
      //    "uf": "SP",
      //    "cep": "00000-000",
      //    "telefone": "(00) 0000-0000",
      //    "email": "nome@email.com"
      // },
      "produtos": arrProdutos,
      "pedido": {
         "presenca": 1,
         "modalidade_frete": 9,
         "intermediador": 0,
         "frete": "0",
         "desconto": venda.desconto,
         "pagamento": 0,
         "forma_pagamento": "03"
      }
    })


    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Consumer-Key': 'nLQGtFLHHIO8d7sIqXusLEOLlXg5iP1E',
      'X-Consumer-Secret': 'qpm2WyEzEVK0cgkEtcHmEw40oSRDqLbddSZhXspimh6gZXYU',
      'X-Access-Token': '2638-itQw1ebjTaNmdEXt0FAclL3Sc1gbE2udnfEDiefOI7a1oSwt',
      'X-Access-Token-Secret': 'TpUDrWEraWajlXxEEWylNXUWHjOZpGaNW5iLLPqWUikzPwN4'
    });

    // return this.http.get('https://webmaniabr.com/api/1/nfe/consulta?uuid=efea7c6c-ccf1-4a3d-9cd5-226ac43126f3', {
    //   headers: headers
    // });

    return this.http.post('https://webmaniabr.com/api/1/nfe/emissao', json, {
      headers: headers
    });


  }

  public consulta(conta, venda) {


    console.log(conta);
    console.log(venda);

    let arrProdutos = []
    venda.itensVenda.forEach(element => {
      let objItemVenda = {
        "nome": element.produto.nome,
        "codigo": element.produto.id,
        "ncm": "0000.00.00",
        "quantidade": element.qt,
        "unidade": "UN",
        "origem": 0,
        "subtotal": element.produto.preco,
        "total": element.preco,
        "classe_imposto": "REF13403215",
     }

     arrProdutos.push(objItemVenda);
    });

    const json = JSON.stringify({
      "ID": venda.id,
      "operacao": 1,
      "natureza_operacao": "Prestacaoo de servico",
      "modelo": 2,
      "finalidade": 1,
      "ambiente": 2,
      // "cliente": {
      //    "cpf": "000.000.000-00",
      //    "nome_completo": "Nome do Cliente",
      //    "endereco": "Av. Brg. Faria Lima",
      //    "complemento": "Escritório",
      //    "numero": 1000,
      //    "bairro": "Itaim Bibi",
      //    "cidade": "São Paulo",
      //    "uf": "SP",
      //    "cep": "00000-000",
      //    "telefone": "(00) 0000-0000",
      //    "email": "nome@email.com"
      // },
      "produtos": arrProdutos,
      "pedido": {
         "presenca": 2,
         "modalidade_frete": 9,
         "intermediador": 0,
         "frete": "0",
         "desconto": venda.desconto,
         "pagamento": 0,
         "forma_pagamento": "03"
      }
    })




    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Consumer-Key': 'nLQGtFLHHIO8d7sIqXusLEOLlXg5iP1E',
      'X-Consumer-Secret': 'qpm2WyEzEVK0cgkEtcHmEw40oSRDqLbddSZhXspimh6gZXYU',
      'X-Access-Token': '2638-itQw1ebjTaNmdEXt0FAclL3Sc1gbE2udnfEDiefOI7a1oSwt',
      'X-Access-Token-Secret': 'TpUDrWEraWajlXxEEWylNXUWHjOZpGaNW5iLLPqWUikzPwN4'
    });

    return this.http.get('https://webmaniabr.com/api/1/nfe/consulta?uuid=663a5a52-af76-4768-87e5-0353a034f87c', {
      headers: headers
    });

  }


}
