import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { ClockService  } from 'src/app/services/clock.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clock-list',
  templateUrl: './clock-list.component.html',
  styleUrls: ['./clock-list.component.css']
})
export class ClockListComponent implements OnInit {
  @ViewChild('mapsSwal') private mapsSwal: SwalComponent;

  titulo = 'Ponto';
  subTitulo = 'Cadastro';
  urlBreadcrumb = 'clocks';
  funcionario: any;
  carga = 8;
  pontos: any;
  lat: number = -23.8779431;
  lng: number = -49.8046873;
  zoom: number = 15;
  usuario: any;
  periodo: any;
  user = new User();
  totalPonto: number = 0;
  totalMes: number = 0;

  constructor(
    private service: ClockService,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe((params) => {
      this.getUsuario(params);      
    });
  }

  getUsuario(params) {
    this.userService.get(params.usuario).subscribe((data: any) => {
      this.user = data;

      this.getRegistros(params.usuario, params.periodo);
    });
  }

  getRegistros(usuario, periodo) {

    if(!periodo) return;

    this.totalPonto = 0;

    var mes = periodo.substr(0, 2);
    var ano = periodo.substr(2);

    this.service.getByUser(usuario, mes, ano).pipe(first()).subscribe((data: any) => {
      var hSem = this.user.cargaSemana * 60; 
      var hSab = this.user.cargaSabado * 60;          

      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if(this.isWeekend(element.dataEntrada)) {          
          data[index].resultado = data[index].saldo - hSab;
          this.getResultado(data[index].resultado, data[index].saldo, data[index].autorizado, hSab);        
        }else{
          data[index].resultado = data[index].saldo - hSem;                    
          this.getResultado(data[index].resultado, data[index].saldo, data[index].autorizado, hSem);        
        }        
      }
      this.pontos = data;
      
      this.periodo = periodo;
      this.getTotalMes(mes, ano);
      this.spinner.hide();

      console.log(this.totalPonto)
    });
  }

  getResultado(resultado, saldo, autorizado, carga) { 

    /** caso seja negativo, soma direto */
    if(resultado < -10 && (autorizado == false || autorizado == null || autorizado == undefined)){
      this.totalPonto += parseFloat(saldo);
      console.log(resultado + ' - ' + saldo + ' - ' + carga + '----');
    }
    /** caso positivo, verifica se for autorizado */
    else if(resultado > 10 && autorizado == true){
      this.totalPonto += parseFloat(saldo);
      console.log(resultado + ' - ' + saldo + ' - ' + carga + '++++');
    }
    /** qualquer outra condição, pega o valor trabalhado */
    else{
      this.totalPonto += carga;
      console.log(resultado + ' - ' + saldo + ' - ' + carga + '====');
    }
  }

  isWeekend(timestamp){
    var data = new Date(timestamp);
    var diaDaSemana = data.getDay();  

    return diaDaSemana == 6 || diaDaSemana == 0;
  }

  getTotalMes(mes, ano) {
    var dayLast = new Date(ano, parseInt(mes), 0);

    var qtDias = 0;
    var qtSab = 0;

    for (let index = 1; index <= dayLast.getDate(); index++) {
      var dCheck = new Date(ano, mes-1, index);

      if(dCheck.getDay() == 6) qtSab++;
      if(dCheck.getDay() != 6 && dCheck.getDay() != 0) qtDias++;
    }

    var hSab = this.user.cargaSabado * 60;    
    var hSem = this.user.cargaSemana * 60;          
    this.totalMes = (qtSab * hSab) + (qtDias * hSem);    
  }

  showMaps(localizacao) {
    localizacao = localizacao.split('|');

    this.lat = parseFloat(localizacao[1]);
    this.lng = parseFloat(localizacao[0]);

    this.mapsSwal.fire();
  }

  setAutorizacao(id) {

    Swal.fire({
      title: 'Deseja autorizar essa data?',
      showCancelButton: true,
      confirmButtonText: 'Autorizar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.autorizar(id).subscribe(data => {
          console.log(data);
          this.getRegistros(this.user.id, this.periodo);
        });

      }
    })


  }

}
