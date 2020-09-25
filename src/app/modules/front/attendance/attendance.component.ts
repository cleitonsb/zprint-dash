import { msg } from './../../../variables/msg';
import { NotificationService } from './../../../services/notification.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  titulo = '';
  subTitulo = '';
  urlBreadcrumb = 'front';

  constructor(private notify: NotificationService) { }

  ngOnInit(): void {}

}
