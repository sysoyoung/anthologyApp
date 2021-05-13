import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-my-article',
  templateUrl: './my-article.component.html',
  styleUrls: ['./my-article.component.scss']
})
export class MyArticleComponent implements OnInit {

  @Input() article: any;
  @Output() articleDeleted: EventEmitter<void> = new EventEmitter();
  @Output() articlePosted: EventEmitter<void> = new EventEmitter();
  @Output() articleHidden: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  deleteArticle(event: any): void{
    event?.stopPropagation();
    this.articleDeleted.emit();
  }

  postArticle(event: any): void{
    event?.stopPropagation();
    this.articlePosted.emit();
  }

  hideArticle(event: any): void{
    event?.stopPropagation();
    this.articleHidden.emit();
  }

  getArticleDate(): string{
    const date = new Date(this.article?.date);
    return  date.getDate() + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear();
  }
}
