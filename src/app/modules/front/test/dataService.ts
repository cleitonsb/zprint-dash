import { environment } from './../../../../environments/environment';
import { ProductService } from './../../../services/product.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface ProductInterface {
  id: number;
  nome?: string;
  ean?: string;
  preco?: string;
  prazo?: string;
  tipo?: string;
}
@Injectable({
    providedIn: 'root'
})
export class DataService {

  produtos: ProductInterface[] = [];


    constructor(private http: HttpClient, private productService: ProductService) { }

    getGithubAccounts(term: string = null) {
        if (term) {
            return this.http.get<any>(`https://api.github.com/search/users?q=${term}`).pipe(map(rsp => rsp.items));
        } else {
            return of([]);
        }
    }

    getAlbums() {
        return this.http.get<any[]>('https://jsonplaceholder.typicode.com/albums');
    }

    getPhotos() {
        return this.http.get<any[]>('https://jsonplaceholder.typicode.com/photos');
    }

    getPeople(term: string = null) {
        let items = this.getMockPeople();
        if (term) {
            items = items.filter(x => x.nome.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
        }
        return of(items).pipe(delay(500));
    }

    getMockPeople() {

      this.productService.getByParam('a').subscribe((data: any) => {
        const items = data;
        // if (val) {
        //   items = items.filter(x => x.nome.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) > -1);
        // }

        this.produtos = items;
      });

      return this.produtos = [
        {
            'id': 1,
            'nome': 'Cleiton',
        },
        {
          'id': 1,
          'nome': 'Arlte',
        },
        {
          'id': 1,
          'nome': 'Dandara',
        },
        {
          'id': 1,
          'nome': 'Karyn Wright',
        },
      ];
    }

    public getByParam(param) {
      return this.http.get(environment.config.apiUrl + '/produto/busca/' + param);
    }
}



