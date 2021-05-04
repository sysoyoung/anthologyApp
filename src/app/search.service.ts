import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _searchValue = '';
  private _arrayOfArticles: Array<object> = [];

  constructor(
    private router: Router,
    // tslint:disable-next-line: variable-name
    private _http: HttpClient
    ) { }

  public getSearchValue(): string {
    return this._searchValue;
  }

  public setSearchValue(value: string): void {
    this._searchValue = value;
  }

  // Observable<object>
  public getAllArticles(): Observable<object>{
    if (this._arrayOfArticles.length === 0){
      this.setSearchValue(this.router.url.split('?')[1]?.split('&')[0]?.split('=')[1]);
    }

    return this._http.get('http://localhost:3000/');
    // return this._arrayOfArticles;
  }

  public navigateToSearch(): void{
    this.router.navigate(['/search'], { queryParams: {query: this._searchValue}});
  }
}
