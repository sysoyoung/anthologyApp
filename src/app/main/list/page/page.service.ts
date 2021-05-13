import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';

interface RelatedArticle{
  title: string;
  id: string;
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
  sources: Array<Reference>;
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

  setArticleId(id: string): void{
    if (id !== ''){
      this.articleId = id;
      return;
    }
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
