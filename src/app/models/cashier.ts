import { User } from './user';
export class Cashier {
  id?: number;
  dataAbertura: Date;
  dataFechamento: Date;
  fundo = 0;
  usuario = new User();
  quebra = 0;
}
