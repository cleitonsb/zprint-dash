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

  constructor(private notify: NotificationService) { }

  ngOnInit(): void {}

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

}
