import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { PersonService } from './../../../services/person.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  people: any;
  titulo = 'Pessoas';
  subTitulo = '';
  urlBreadcrumb = 'people';
  total: Number;

  paramBusca = '';

  constructor(private service: PersonService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getRegistros();
  }

  getRegistros(page: number = 1) {

    const param = (this.paramBusca) ? '/busca/' + this.paramBusca : '';

    this.spinner.show();
    this.service.getAll(param, page).pipe(first()).subscribe((data: any) => {
      this.people = data.content;
      this.total = data.totalElements;
      this.spinner.hide();
    });
  }

}
