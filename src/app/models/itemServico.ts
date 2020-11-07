import { Product } from './product';

export class ItemServico {
  id: number;
  produto = new Product();
  qt: number;
  preco: number;
  custo: number;
  subtotal: number;
}

