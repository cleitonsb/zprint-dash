import { EmitterService } from './../../../services/emitter.service';
import { msg } from './../../../variables/msg';
import { NotificationService } from './../../../services/notification.service';
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  @ViewChild('btnVenda') btnVenda: ElementRef;
  @ViewChild('btnServico') btnServico: ElementRef;
  @ViewChild('btnCaixa') btnCaixa: ElementRef;


  titulo = '';
  subTitulo = '';
  urlBreadcrumb = 'front';

  caixa: any;
  servico: any;
  currentUser: any;

  constructor(private notify: NotificationService, private emitterService: EmitterService) { }

  ngOnInit(): void {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if(currentUser.user){
      this.currentUser = currentUser;
      this.getRoutes();
    }else{
      this.emitterService.msgEmitter.subscribe(msg => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if(currentUser){
          this.currentUser = currentUser;
          this.getRoutes();
        }
      });
    }
  }

  @HostListener('document:keydown', ['$event'])
  detectKey(e: KeyboardEvent) {
    if (e.key === 'F2') {
      this.btnVenda.nativeElement.click();
    }

    if (e.key === 'F7') {
      this.btnServico.nativeElement.click();
    }

    if (e.key === 'F8') {
      this.btnCaixa.nativeElement.click();
    }
  }

  getRoutes( ) {

    for (const val of this.currentUser.user.perfil.permissoes) {
     if(val.rota == '/caixa') {
      this.caixa = true;
     }

     if(val.rota == '/servico') {
      this.servico = true;
     }
    }
  }


}
