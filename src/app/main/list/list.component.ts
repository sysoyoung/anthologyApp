import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NavigationStart, Router, Event, NavigationEnd } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchService } from 'src/app/search.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  searchIcon = faSearch;
  searchControl!: FormControl;

  public nothing = '';

  public arrayOfArticles: Array<object> = [];

  constructor(
    private searchService: SearchService,
    private router: Router,
    private titlePage: Title,
    ) {
      this.router.events.subscribe( (event: Event) => {
        if ( event instanceof NavigationEnd){
          this.ngOnInit();
        }
      });
    }

  ngOnInit(): void {
    this.titlePage.setTitle('Результати пошуку');

    this.searchControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

    this.searchService.getAllArticles().subscribe((articles: Array<object> | any) => {
      this.arrayOfArticles = articles;
      if (articles.length === 0){
        this.nothing = 'Нічого не знайдено!';
      }
    });

    setTimeout( () => {
      if (this.arrayOfArticles.length === 0){
        this.nothing = 'Пока что не придумал что здесь написать';
      }
    }, 3000);
  }

  search(): void{
    if (this.searchControl.valid){
      this.searchService.setSearchValue(this.searchControl.value);
      this.searchService.navigateToSearch();
    }
  }
}
