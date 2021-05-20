import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService, User, Article } from './user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user!: any;

  constructor(
    private userService: UserService,
    private titlePage: Title,
  ) { }

  ngOnInit(): void {
    this.userService.getUserInfo('').subscribe( (data: User) => {
      if (data.status){
        this.user = data;
        this.titlePage.setTitle(this.user.name);
        return;
      }
      this.userLogout();
    });
  }

  deleteArticle(id: string): void{
    this.user.articles = this.user.articles.filter( (article: Article) => article.id !== id);
    this.userService.deleteArticle(id);
  }

  changeArticleStatus(id: string, status: string): void{
    let index = -1;
    this.user.articles.find((item: Article, i: number) => {
      if (item.id === id){
        index = i;
        return true;
      }
      return false;
    } );
    if (index !== -1){
      this.user.articles[index].status = status;
      this.userService.changeArticleStatus(id, status);
    }
  }

  userLogout(): void{
    this.userService.logout();
  }
}
