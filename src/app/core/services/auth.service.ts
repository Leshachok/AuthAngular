import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly accessTokenKey = 'access_token';
  private readonly userNameClaim = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
  isLoggedIn = false;

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  getToken(): string {
    return localStorage.getItem(this.accessTokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.accessTokenKey, token);
  }

  login(login: string, password: string){
    let url:string = `https://pnitfunctions.azurewebsites.net/api/token?userName=${login}&password=${password}`;
    this.authenticate(url)
  }

  private async authenticate(url: string){
      const response = await this.httpClient.get(url);
      response.subscribe(value => {
        this.isLoggedIn = true;
        const data = <Response>value
        const token  = data.access_token
        this.setToken(token)
        this.router.navigate(['/orders'])
      }, error => {
        console.error(error)
        alert('Invalid data')
      })
  }  
  

  logout(): void {
    localStorage.removeItem(this.accessTokenKey);
    this.isLoggedIn = false;

    this.router.navigate([''])
  }

  getUserName(): void {
    const token = this.getToken();

    const jwtHelperService = new JwtHelperService();
    const decodedToken = jwtHelperService.decodeToken(token);

    return decodedToken[this.userNameClaim];
  }
}

class Response{
  access_token:string = ''
  username:string = ''
}
