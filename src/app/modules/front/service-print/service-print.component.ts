import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-print',
  templateUrl: './service-print.component.html',
  styleUrls: ['./service-print.component.css']
})
export class ServicePrintComponent implements OnInit {

  servico: Service;
  entrada: number = 0;


  constructor(
    private ServiceService: ServiceService, 
    private spinner: NgxSpinnerService, 
    private route: ActivatedRoute
  ){ }

  ngOnInit(): void {
    this.spinner.show();
    this.servico = new Service();
    this.route.params.subscribe((params) => this.getServico(params.id));
  }

  getServico(id) {
    this.ServiceService.get(id).subscribe((data: Service) => {
      this.servico = data;
      this.spinner.hide();     

      this.servico.contas.forEach(element => {
        this.entrada += element.valor;
      });
      
    });
  }

}
