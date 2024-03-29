import {Endereco} from './endereco';
import { Role } from './role';

export class User {
  id = 0;
  dt_nasc?: string;
  email?: string;
  telefone?: string;
  nome?: string;
  celular?: string;
  perfil = new Role();
  token?: string;
  avatar?: any;
  enderecos = new Array<Endereco>();
  cargaSeg?: number;
  cargaTer?: number;
  cargaQua?: number;
  cargaQui?: number;
  cargaSex?: number;
  cargaSab?: number;
  cargaDom?: number;
}

