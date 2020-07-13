import {Cidade} from "./cidade";

export class Endereco {
  id?: number;
  apelido?: any;
  logradouro?: any;
  bairro?: any;
  numero?: any;
  cep?: any;
  cidade = new Cidade();
  cidade_id?: any;
}
