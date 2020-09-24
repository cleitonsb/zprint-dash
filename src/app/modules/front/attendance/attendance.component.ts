import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  titulo = '';
  subTitulo = '';
  urlBreadcrumb = 'front';

  paramBusca = '';

  constructor() { }

  ngOnInit(): void {
  }

}
