import { EmitterService } from './../../services/emitter.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  public user: User;
  public subTitle: string;
  public avatar: string;
  public userId: number;

  constructor(
    location: Location,
    private router: Router,
    private authenticationService: AuthenticationService,
    private emitterService: EmitterService
  ) {
    this.location = location;
  }

  ngOnInit() {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if(currentUser.user){
      this.setUser(currentUser);
    }else{
      this.emitterService.msgEmitter.subscribe(msg => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if(currentUser.user){
          this.setUser(currentUser);
        }
      });
    }

    this.listTitles = ROUTES.filter(listTitle => listTitle);

  }

  setUser(currentUser) {
    this.user = currentUser.user;
    this.userId = this.user.id;

    if(this.user.avatar === null) {
      this.avatar = '/assets/img/theme/profile2.png';
    }else{
      this.avatar = this.user.avatar;
    }
  }

  getTitle(){
    this.subTitle = null;

    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
      titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
      if(this.listTitles[item].path === titlee){
        return this.listTitles[item].title;
      }
    }
    return 'Serviços';
  }

  getSubTitle(){
    return this.subTitle;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
