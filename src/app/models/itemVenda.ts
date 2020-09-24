import { Product } from './product';

export class ItemVenda {
  produto = new Product();
  qt: number;
  preco: number;
  subtotal: number;
  nome: string;
}

