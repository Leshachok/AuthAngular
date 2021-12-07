import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenInterceptor } from '../core/interceptors/token.interceptor';

import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  
  constructor(private authService:AuthService) {
    
  }

  ngOnInit() {
  }

  onFormSent(){
    let login:string = (<HTMLInputElement>document.getElementById("loginId")).value;
    let password:string = (<HTMLInputElement>document.getElementById("passwordId")).value;

    this.authService.login(login, password)
  }

}
