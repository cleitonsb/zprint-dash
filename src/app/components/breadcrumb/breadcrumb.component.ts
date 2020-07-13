import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  @Input() titulo: any;
  @Input() subTitulo: any;
  @Input() urlBreadcrumb: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.subTitulo)
  }

}
