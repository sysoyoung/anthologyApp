import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchValue = '';
  private arrayOfArticles: Array<object> = [];

  constructor(
    private router: Router,
    private http: HttpClient
    ) { }

  public getSearchValue(): string {
    return this.searchValue;
  }

  public setSearchValue(value: string): void {
    this.searchValue = value;
  }

  public getAllArticles(): Observable<object>{
    if (this.arrayOfArticles.length === 0){
      this.setSearchValue(this.router.url.split('?')[1]?.split('&')[0]?.split('=')[1]);
    }

    const myParams = new HttpParams().set('query', this.searchValue);

    return this.http.get('http://localhost:3000/search', {params: myParams});
  }

  public navigateToSearch(): void{
    this.router.navigate(['/search'], { queryParams: {query: this.searchValue}});
  }
}
