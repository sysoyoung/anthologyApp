import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any;
  user: any;

  constructor(private http: HttpClient) { }

  authUser(user: object): Observable<object> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/account/auth', user, { headers });
  }

  storeUser(token: string, user: object): any{
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.token = token;
    this.user = user;
  }

  getUserIdfromStorage(): string{
    return JSON.parse(localStorage.getItem('user') || '')?.id  || '';
  }

  getUserNameFromStorage(): string{
    return JSON.parse(localStorage.getItem('user') || '')?.name || '';
  }

  logout(): void{
    this.token = null;
    this.user = null;
    localStorage.clear();
  }
}
