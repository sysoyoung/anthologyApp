import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleCreationService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) { }

  checkTitle(title: string, author: string): Observable<object>{
   return this.http.get(`http://localhost:3000/article/check/${author}/${title}`);
  }

  createArticle(article: object): Observable<object>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const authorId = this.authService.getUserIdfromStorage();
    return this.http.post('http://localhost:3000/article/create/' + authorId, article, { headers });
  }
}
