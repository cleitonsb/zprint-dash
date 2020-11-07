import { Payment } from './payment';
import { TipoConta } from './../enums/tipo-conta';

export class ChartBill {
  id?: number;
  nome: String;
  tipoConta: TipoConta;
}
