import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from './../../../services/service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  servicos: any;
  titulo = 'Serviços';
  subTitulo = '';
  urlBreadcrumb = 'front/services';
  total: Number;

  paramBusca = '';

  constructor(private service: ServiceService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    this.getRegistros();
  }

  getRegistros(page: number = 1) {

    const param = (this.paramBusca) ? '/busca/' + this.paramBusca : '';

    this.spinner.show();
    this.service.getAll(param, page).pipe(first()).subscribe((data: any) => {
      this.servicos = data.content;
      this.total = data.totalElements;
      this.spinner.hide();
    });
  }

  edit(idService: string) {
    this.router.navigate(['/front/service-create/' + idService]);
  }

}
