import { EquipmentService } from '../services/equipment.service';
import {Endereco} from './endereco';

export class Person {
  id = 0;
  nome?: string;
  razaoSocial?: string;
  cnpjCpf?: string;
  inscricaoRg?: string;
  email?: string;
  telefone?: string;
  celular?: string;
  enderecos = new Array<Endereco>();
  cliente?: boolean;
  fornecedor?: boolean;
  equipamentos = new Array<EquipmentService>();
}

