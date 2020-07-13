import {Component, OnInit, ViewChild} from '@angular/core';
import {ServiceService} from "../../../services/service.service";
import {NgxSpinnerService} from "ngx-spinner";
import {first} from "rxjs/operators";
import {PaginatorComponent} from "../../../components/paginator/paginator.component";

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
  private services: [];

  @ViewChild(PaginatorComponent)
  private paginator: PaginatorComponent;

  constructor(private serviceService: ServiceService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    //this.getRegistros();
  }

  getRegistros(page : number = 1){
    this.spinner.show();
    this.serviceService.getAll(page).pipe(first()).subscribe((data : any) => {
      this.services = data.data;
      this.paginator.getPaginator(data.meta);
      this.spinner.hide();
    })
  }

}
