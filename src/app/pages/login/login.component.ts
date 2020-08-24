import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {first} from "rxjs/operators";
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: null;
  error = '';
  userEmail = '';
  userPass = '';
  remember: any;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private msg: NotificationService
    ) {
    if(this.authenticationService.currentUserValue){
      this.router.navigate(['/services']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false],
    });

    if(localStorage.getItem('remember') == 'true'){
      this.userPass = localStorage.getItem('password');
      this.userEmail = localStorage.getItem('email');
      this.remember = localStorage.getItem('remember');
    }

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/services';
  }

  get f(){
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if(this.f.remember.value){
      localStorage.setItem('email', this.f.email.value);
      localStorage.setItem('password', this.f.password.value);
      localStorage.setItem('remember', this.f.remember.value);
    }else{ console.log('note');

      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('remember');
    }

    if(this.loginForm.invalid){
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
         // this.msg.error("Usuário ou senha inválida", 'Erro 401');

          this.error = error;
          this.loading = false;
        }
      );
  }

  ngOnDestroy() {
  }

}
