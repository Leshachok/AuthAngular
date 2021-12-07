import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean  {

      if(this.authService.isLoggedIn){
        let token = this.authService.getToken()
        let decoded = jwt_decode(token)
        let exp_time = decoded['exp'] * 1000

        let current_time = Date.now()
        let diff: number = (exp_time - current_time)/1000
        if(Math.abs(diff) > 120){
          alert('Сессия завершена')
          this.router.navigate(['/'])
          return false
        }

        return true
      }
      alert('not logged in')
      this.router.navigate(['/'])
      return false
      
  }
}
