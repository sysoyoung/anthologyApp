import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-article',
  templateUrl: './my-article.component.html',
  styleUrls: ['./my-article.component.scss']
})
export class MyArticleComponent implements OnInit {

  @Input() article: any;

  constructor() { }

  ngOnInit(): void {

  }

}
