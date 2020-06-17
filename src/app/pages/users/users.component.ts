import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {first} from "rxjs/operators";
import {User} from "../../models/user";
import {PaginatorComponent} from "../../components/paginator/paginator.component";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];

  @ViewChild(PaginatorComponent)
  paginator: PaginatorComponent;

  constructor(private userService: UserService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getRegistros();
  }

  getRegistros(page : number = 1){
    this.spinner.show();
    this.userService.getAll(page).pipe(first()).subscribe((users : any) => {
      this.users = users.data;
      this.paginator.getPaginator(users.meta);
      this.spinner.hide();
    })
  }





}
