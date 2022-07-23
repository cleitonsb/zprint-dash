import { PaymentBill } from './paymentBill';
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
  situacao: boolean;
  contas = new Array<PaymentBill>();
  cpf?: string;
}

