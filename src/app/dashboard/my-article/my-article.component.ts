import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleCreationService } from 'src/app/article-creation/article-creation.service';
import { PageService } from 'src/app/main/list/page/page.service';
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

  constructor(
    private router: Router,
    private pageService: PageService,
    private articleCreationService: ArticleCreationService
    ) { }

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

  changeArticle(event: any): void{
    event?.stopPropagation();

    this.pageService.setArticleId(this.article.id);
    this.pageService.getArticle().subscribe( (data: any) => {
      if (data.success){
        this.articleCreationService.articleToChange = data;
        this.router.navigate(['/dashboard/article/change/', this.article.id]);
      }
    });
  }
}
