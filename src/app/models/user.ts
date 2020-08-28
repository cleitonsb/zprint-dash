import {Endereco} from './endereco';

export class User {
  id: number;
  dt_nasc?: string;
  email?: string;
  password?: string;
  telefone?: string;
  nome?: string;
  celular?: string;
  perfil?: number;
  token?: string;
  avatar?: any;
  endereco = new Endereco();
  enderecos = new Array();
}

