import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor( private http: HttpClient) { }

  registerUser(user: object): any{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/account/reg', user, { headers });
                    // .pipe(map(data => data));
                    // res => res.json()
  }

}
