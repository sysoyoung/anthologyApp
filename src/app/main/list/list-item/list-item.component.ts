import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input() article: any;

  constructor() { }

  ngOnInit(): void {
  }

  getArticleTitleWithoutSpaces(): string{
    return this.article.title.split(' ').join('_');
  }

  getArticleDate(): string{
    const date = new Date(this.article?.date);
    return  date.getDate() + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear();
  }
}
