import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/services', title: 'Serviços',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/users', title: 'Usuários',  icon: 'ni-single-02 text-primary', class: '' },
  { path: '/roles', title: 'Perfis',  icon:'ni-bullet-list-67 text-red', class: '' },
  { path: '/products', title: 'Produtos',  icon:'ni-bullet-list-67 text-red', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
