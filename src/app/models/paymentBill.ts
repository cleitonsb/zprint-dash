import { Cashier } from './cashier';
import { Payment } from './payment';
import { TipoConta } from './../enums/tipo-conta';
import { ChartBill } from './chartBill';
import { User } from './user';
export class PaymentBill {
  id?: number;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  usuario = new User();
  tipoConta: string;
  descricao: string;
  planoConta = new ChartBill();
  pagamentos = new Array<Payment>();
  caixa: Cashier;
  troco = 0;
}
