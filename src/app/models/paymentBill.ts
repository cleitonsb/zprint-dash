import { TipoConta } from './../enums/tipo-conta';
import { ChartBill } from './chartBill';
import { User } from './user';
export class PaymentBill {
  id?: number;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  usuario = new User();
  tipoConta: TipoConta;
  descricao: string;
  planoConta = new ChartBill();
}
