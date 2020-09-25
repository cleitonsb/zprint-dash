import { Cashier } from './cashier';
import { Payment } from './payment';
import { ItemVenda } from './itemVenda';
import { User } from './user';

export class Venda {
  id?: number;
  nome?: string;
  data?: Date;
  total = 0;
  desconto = 0;
  usuario: User;
  itensVenda = new Array<ItemVenda>();
  pagamentos = new Array<Payment>();
  caixa = new Cashier();
  troco = 0;
  situacao: boolean;
}

