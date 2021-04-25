import { DateFunctions } from './../../../helpers/date.functions';
import { first, map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { CashierService } from './../../../services/cashier.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from 'ng-apexcharts';
import { DatePipe } from '@angular/common';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-cashier-rel',
  templateUrl: './cashier-rel.component.html',
  styleUrls: ['./cashier-rel.component.css']
})
export class CashierRelComponent implements OnInit {

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions;

  dataInicial: String;
  dataFinal: String;

  titulo = 'Caixas';
  subTitulo = 'Relatório';
  urlBreadcrumb = 'front/cashiers';

  public data: any;
  public salesChart;
  public clicked = true;
  public clicked1 = false;

  caixas: any;
  totalDinheiro = 0;
  totalCcredito = 0;
  totalCdebito = 0;
  totalTransferencia = 0;
  totalOutros = 0;
  totalQuebra = 0;
  total = 0;

  constructor(
    private service: CashierService,
    private spinner: NgxSpinnerService,
    private date: DateFunctions
  ) {
    this.chartOptions = {
      series: [],
      chart: {
        height: 350,
        type: 'line'
      },
      title: { text: 'Faturamento no período' },
    };

   }

  ngOnInit(): void {
    this.getRelatorio();
  }

  getRelatorio() {
    const param = '';

    this.spinner.show();

    this.dataInicial = this.date.firstDay();
    this.dataFinal = this.date.today();

    this.service.getRel(this.dataInicial, this.dataFinal).pipe(first()).subscribe((data: any) => {

      const arrValores = [];
      const arrCat = [];

      data.map(function (value) {
        const d = new Date(value[0]);
        arrCat.push( d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() );

        const vl = value[1];
        arrValores.push(vl);
      });

      this.chartOptions = {
        series: [
          {
            name: 'Faturamento',
            data: arrValores
          }
        ],
        chart: {
          height: 350,
          type: 'line'
        },
        title: {
          text: 'Faturamento no período'
        },
        yaxis: {
          labels: {
            formatter: function (value: string) {
              return value + 'R$';
            }
          },
        },
        xaxis: {
          categories: arrCat
        }
      };

      this.service.getRelDetalhe(this.dataInicial, this.dataFinal).pipe(first()).subscribe((data: any) => {
        this.caixas = data;

        data.forEach(element => {
          this.totalDinheiro += element.dinheiro;
          this.totalCcredito += element.cartaocredito;
          this.totalCdebito += element.cartaodebito;
          this.totalTransferencia += element.transferencia;
          this.totalOutros += element.outros;
          this.totalQuebra += element.quebra;
          this.total += element.total;
        });

        this.spinner.hide();
      });    
    });
  }

}
