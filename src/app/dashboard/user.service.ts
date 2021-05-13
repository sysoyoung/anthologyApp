import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export interface User{
  status: boolean;
  id: string;
  name: string;
  email: string;
  articles: [Article];
}

export interface Article{
  id: string;
  title: string;
  author: string;
  date: number;
  status: string;
}
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
    this.router.navigate(['/authentication']);
    this.authService.logout();
  }

  isLoggedIn(): boolean{
    return !this.jwtHelper.isTokenExpired();
  }

  getUserInfo(id: string): Observable<User>{
    let userId = id;
    if (id === ''){
      const temp = this.router.url.split('/');
      userId = temp[temp.length - 1];
    }
    return this.http.get('http://localhost:3000/account/dashboard/' + userId) as Observable<User>;
  }

  deleteArticle(id: string): void{
    this.http.delete('http://localhost:3000/article/' + id).subscribe();
  }

  changeArticleStatus(id: string, status: string): void{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.put('http://localhost:3000/article/' + id, {status}, {headers}).subscribe();
  }
}
