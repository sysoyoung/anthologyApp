import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';

interface RelatedArticle{
  title: string;
}

interface Reference{
  link: string;
  title: string;
}

export interface ArticleInterface{
  id: string;
  title: string;
  author: string;
  date: number;
  relatedArticles: Array<RelatedArticle>;
  references: Array<Reference>;
  tags: Array<string>;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private articleId = '';

  constructor(
    private router: Router,
    private http: HttpClient
    ) { }

  setArticleId(): void{
    const articleIdFromUrl = /(?<=\/)[^\/.]+$/.exec(this.router.url);
    this.articleId = articleIdFromUrl ? articleIdFromUrl[0] : '';
  }

  getArticleId(): string{
    return this.articleId;
  }

  getArticle(): any{
      return this.http.get('http://localhost:3000/page/' + this.articleId);
  }
}
