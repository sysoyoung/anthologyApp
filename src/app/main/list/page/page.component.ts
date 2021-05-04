import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, Event, NavigationEnd } from '@angular/router';
import { SearchService } from 'src/app/search.service';
import { PageService, ArticleInterface } from './page.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  public article: ArticleInterface | undefined;
  public text: any;

  constructor(
    private pageService: PageService,
    private router: Router,
    private searchService: SearchService,
    private titlePage: Title
    ) {
    // tslint:disable-next-line: deprecation
    this.router.events.subscribe((event: Event) => {
      if ( event instanceof NavigationEnd){
        this.changePage();
      }
    });
  }

  ngOnInit(): void { }

  changePage(): void{
    this.pageService.setArticleId();
    this.pageService.getArticle().subscribe((a: any) => {
      this.article = a;
      this.titlePage.setTitle(this.article?.title || 'Anthology');
      this.decomposeText();
    });
  }

  getArticleDate(): string{
    if (this.article){
      const date = new Date(this.article.date);
      return  date.getDate() + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear();
    }
    return '';
  }

  getArticleTitleWithoutSpaces(title: string): string{
    return title.split(' ').join('_');
  }

  searchByTag(searchValue: string): void{
    this.searchService.setSearchValue(searchValue);
    this.searchService.navigateToSearch();
  }

  decomposeText(): void{
    let text: any = this.article?.text;

    text = text?.split('<h2>');
    this.text = text.map( (a: any) => {
      const b: any = a.split('</h2>');
      b[b.length - 1] = b[b.length - 1].split('\n');
      return b;
    });
  }

}
