import { Equipment } from './equipment';
import { Person } from './person';
import { ItemServico } from './itemServico';
import { PaymentBill } from './paymentBill';
import { User } from './user';

export class Service {
  id?: number;
  data: Date;
  previsao: Date;
  total = 0;
  desconto = 0;
  situacao: boolean;
  usuario: User;
  responsavel = new User();
  pessoa = new Person();
  itensServico = new Array<ItemServico>();
  contas = new Array<PaymentBill>();
  equipamento = new Equipment();
  acessorios?: string;
  relato?: string;
}

