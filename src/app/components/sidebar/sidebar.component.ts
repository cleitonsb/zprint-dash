import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from "../../services/authentication.service";

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    route: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/services', title: 'Serviços',  icon: 'ni-tv-2 text-primary', class: '', route: 'api/servicos' },
  { path: '/users', title: 'Usuários',  icon: 'ni-single-02 text-green', class: '', route: 'api/users' },
  { path: '/roles', title: 'Perfis',  icon:'ni-bullet-list-67 text-red', class: '', route: 'api/perfis' },
  { path: '/products', title: 'Produtos',  icon:'ni-key-25 text-black', class: '', route: 'api/produtos' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  isCollapsed = true;
  version = '0.1-beta';

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(this.getRoutes);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  getRoutes(route) {

    let user: any = JSON.parse(localStorage.getItem('currentUser'));

    console.log(route)

    for (let val of user.perfil.permissoes) {
      if(val.rota === route.route){
        return true;
      }
      console.log(val);
    }
  }

}
