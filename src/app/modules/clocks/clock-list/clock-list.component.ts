import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
import { ClockService  } from 'src/app/services/clock.service';
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

  constructor(
    private service: ClockService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    console.log(1);

    this.spinner.show();
    this.route.params.subscribe((params) => {


      var usuario = params.usuario.split('-');

      this.funcionario = usuario[1];
      var idUsuario = usuario[0];

      this.getRegistros(idUsuario, params.periodo);
    });
  }

  getRegistros(usuario, periodo) {

    var mes = periodo.substr(0, 2);
    var ano = periodo.substr(2);

    this.service.getByUser(usuario, mes, ano).pipe(first()).subscribe((data: any) => {
      this.pontos = data;

      this.usuario = usuario;
      this.periodo = periodo;

      this.spinner.hide();
    });
  }

  showMaps(localizacao) {

    console.log(localizacao);
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
          this.getRegistros(this.usuario, this.periodo);
        });

      }
    })


  }

}
