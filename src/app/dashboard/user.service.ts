import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }

  logout(): void{
    this.router.navigate(['/']);
    this.authService.logout();
  }

  isLoggedIn(): boolean{
    return !this.jwtHelper.isTokenExpired();
  }
}
