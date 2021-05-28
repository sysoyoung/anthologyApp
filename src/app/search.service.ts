import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchValue = '';

  constructor(
    private router: Router,
    private http: HttpClient
    ) { }

  public setSearchValue(value: string): void {
    this.searchValue = value;
  }

  public getSearchValue(): string{
    return this.searchValue;
  }

  public getAllArticles(): Observable<object>{
    if (this.searchValue.length === 0){
      const myUrl = this.router.url;
      this.setSearchValue(this.router.parseUrl(myUrl).queryParams.query);
    }

    const myParams = new HttpParams().set('query', this.searchValue);
    return this.http.get('http://localhost:3000/search', {params: myParams});
  }

  public navigateToSearch(): void{
    this.router.navigate(['/search'], { queryParams: {query: this.searchValue}});
  }
}
