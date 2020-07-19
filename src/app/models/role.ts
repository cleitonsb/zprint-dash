import {Permission} from "./permission";

export class Role {
  id: number;
  nome?: string;
  descricao?: string;
  permissoes?: Array<Permission>;
  _method?: any;
}

