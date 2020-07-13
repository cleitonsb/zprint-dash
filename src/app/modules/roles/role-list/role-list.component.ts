import {Component, OnInit, ViewChild} from '@angular/core';
import {PaginatorComponent} from "../../../components/paginator/paginator.component";
import {NgxSpinnerService} from "ngx-spinner";
import {first} from "rxjs/operators";
import {RoleService} from "../../../services/role.service";

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  roles: any;

  @ViewChild(PaginatorComponent)
  paginator: PaginatorComponent;

  constructor(private roleService: RoleService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getRegistros();
  }

  getRegistros(){
    this.spinner.show();
    this.roleService.getAll().pipe(first()).subscribe((rows : any) => {
      this.roles = rows;
      this.spinner.hide();
    })
  }

}
