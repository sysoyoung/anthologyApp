import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User, UserService } from '../dashboard/user.service';
import { PageService } from '../main/list/page/page.service';
import { SearchService } from '../search.service';
import { ArticleCreationService } from './article-creation.service';

@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.scss']
})
export class ArticleCreationComponent implements OnInit {

  articleFormGroup!: FormGroup;
  private PRIMARY_OUTLET = 'primary';
  cArticle: any;
  isCreateForm = false;

  relatedArticleControl = new FormControl();
  relatedArticleArray: Array<any> = [];
  proposedArticlesArray: Array<any> = [];
  showProposedArticles = false;

  constructor(
    private fb: FormBuilder,
    private articleCreation: ArticleCreationService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private titlePage: Title,
    private searchService: SearchService
    ) {
      this.userService.getUserInfo(this.authService.getUserIdfromStorage()).subscribe( (data: User) => {
        if (!data.status){
          this.userService.logout();
        }
      });
    }

  ngOnInit(): void {
    const myUrlTree = this.router.parseUrl(this.router.url);
    const articleChangeId = myUrlTree.root.children[this.PRIMARY_OUTLET].segments[3]?.path;

    this.relatedArticleControl.valueChanges.subscribe( value => {
      this.searchProposedArticles(value);
    });


    if (articleChangeId === undefined){
      this.isCreateForm = true;
      this.titlePage.setTitle('Створення статті');
      this.cArticle = null;
      this.createArticleCreationForm();
      return;
    }

    if (this.articleCreation.articleToChange?.id === +articleChangeId){
      this.isCreateForm = true;
      this.titlePage.setTitle('Змінення статті');
      this.cArticle = this.articleCreation.articleToChange;
      this.relatedArticleArray = this.cArticle?.relatedArticles;
      this.createArticleChangeForm();
      return;
    }

    this.router.navigate(['/dashboard/' + this.authService.getUserIdfromStorage()]);
  }

  addArticleToRelated(art: any): void{
    for (const related of this.relatedArticleArray){
      if (related.id === art.id){ return; }
    }
    this.relatedArticleArray.push(art);
  }

  deleteRelatedFromArray(index: number): void{
    this.relatedArticleArray =  this.relatedArticleArray.filter( (_, i) => i !== index);
  }

  searchProposedArticles(value: string): void{
    this.searchService.setSearchValue(value);
    this.searchService.getAllArticles().subscribe( (responce: Array<object> | any) => {
      this.proposedArticlesArray = responce.filter( (elem: any) => elem.id !== this.cArticle?.id);
      this.checkListLength();
    });
  }

  checkListLength(): void{
    if (this.proposedArticlesArray.length === 0){
      this.showProposedArticles = false;
      return;
    }
    this.showProposedArticles = true;
  }

  createArticleChangeForm(): void{
    this.articleFormGroup = this.fb.group({
      title: [ this.cArticle.title , Validators.required],
      lang: [ this.cArticle.lang ],
      description: [ this.cArticle.description ],
      sources: this.fb.array([]),
      tags: this.fb.array([]),
      text: [ this.cArticle.text ]
    });

    this.cArticle.tags.forEach( (element: string) => {
        this.createNewTagControl(element);
    });

    this.cArticle.sources.forEach( (element: any) => {
      this.createNewSourceFromGroup(element.title, element.link);
    });
  }

  createArticleCreationForm(): void{
    this.articleFormGroup = this.fb.group({
      title: ['Приклад хорошого заголовку', Validators.required],
      lang: ['укр'],
      description: ['Дуже короткий опис статті'],
      sources: this.fb.array([
        this.fb.group({
          title: ['Приклад: Введение в онтологическое моделирование'],
          link: ['Приклад: https://trinidata.ru/files/SemanticIntro.pdf']
        })
      ]),
      tags: this.fb.array([ ['Приклад: онтологія'] ]),
      text: [`Онтолоогія — вчення про буття, розділ філософії, у якому з'ясовуються фундаментальні проблеми існування, розвитку сутнісного, найважливішого.`]
    });
  }

  getSourcesFormArray(): FormArray{
    return this.articleFormGroup.get('sources') as FormArray;
  }

  getTagsFormArray(): FormArray{
    return this.articleFormGroup.get('tags') as FormArray;
  }

  createNewSourceFromGroup(title = '', link = ''): void{
    const group = this.fb.group({
      title: [title],
      link: [link]
    });

    this.getSourcesFormArray().push(group);
  }

  removeLastSourceFromGroup(event: any): void{
    if (event.screenX === 0){
      return;
    }
    this.getSourcesFormArray().removeAt( this.getSourcesFormArray.length - 1 );
  }

  createNewTagControl(value = ''): void{
    this.getTagsFormArray().push(this.fb.control(value));
  }

  removeLastTagControl(): void{
    this.getTagsFormArray().removeAt( this.getTagsFormArray().length - 1);
  }

  getSourceFormGroup(formGroupName: AbstractControl): FormGroup{
    return formGroupName as FormGroup;
  }

  submit(): void{
    if (this.articleFormGroup.valid){
      const title = this.articleFormGroup.value.title;
      // если я изменяю статью
      if (this.cArticle){
        if (title === this.cArticle.title){
          this.submitChangedArticle();
          return;
        }
        this.checkTitle(title, this.submitChangedArticle);
        return;
      }
      this.checkTitle(title, this.submitNewArticle);
    }
  }

  checkTitle(title: string, callback: () => void): void{
    const titleElement = document.getElementById('title');
    const author = this.authService.getUserIdfromStorage();

    this.articleCreation.checkTitle(title, author).subscribe( (responce: any) => {
      if (responce.valid){
        titleElement?.classList.remove('red-border');
        callback.call(this);
        return;
      }
      titleElement?.classList.add('red-border');
      titleElement?.scrollIntoView();
    });
  }

  submitNewArticle(): void{
    this.articleFormGroup.value.relatedArticles = this.relatedArticleArray.map( elem => elem.id );
    this.articleCreation.createArticle(this.articleFormGroup.value).subscribe( (responce: any) => {
      if (responce.success){
        this.navigateToDashboard();
      }
    });
  }

  submitChangedArticle(): void{
    this.articleFormGroup.value.id = this.cArticle.id;
    this.articleFormGroup.value.date = this.cArticle.date;
    this.articleFormGroup.value.relatedArticles = this.relatedArticleArray.map( elem => elem.id );

    this.articleCreation.changeArticle(this.articleFormGroup.value).subscribe( (responce: any) => {
      if (responce.success){
        this.navigateToDashboard();
      }
    });
  }

  navigateToDashboard(): void{
    this.router.navigate(['/dashboard/' + this.authService.getUserIdfromStorage()]);
  }
}
