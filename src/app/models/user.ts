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
  cargaSemana?: number;
  cargaSabado?: number;
}

