import { Product } from './product';
import {Endereco} from './endereco';

export class ItemVenda {
  id: number;
  produto = new Product();
  qt: number;
  preco: number;
}

