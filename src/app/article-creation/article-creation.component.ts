import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User, UserService } from '../dashboard/user.service';
import { ArticleCreationService } from './article-creation.service';

@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.scss']
})
export class ArticleCreationComponent implements OnInit {

  articleFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private articleCreation: ArticleCreationService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
    ) {
      this.userService.getUserInfo(this.authService.getUserIdfromStorage()).subscribe( (data: User) => {
        if (!data.status){
          this.userService.logout();
        }
      });
    }

  ngOnInit(): void {




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
      // related: this.fb.array([ ['rel arr'] ]),
      text: [`Онтолоогія — вчення про буття, розділ філософії, у якому з'ясовуються фундаментальні проблеми існування, розвитку сутнісного, найважливішого.`]
    });
  }

  getSourcesFormArray(): FormArray{
    return this.articleFormGroup.get('sources') as FormArray;
  }

  getTagsFormArray(): FormArray{
    return this.articleFormGroup.get('tags') as FormArray;
  }

  createNewSourceFromGroup(): void{
    const group = this.fb.group({
      title: [''],
      link: ['']
    });

    this.getSourcesFormArray().push(group);
  }

  removeLastSourceFromGroup(event: any): void{
    if (event.screenX === 0){
      return;
    }
    this.getSourcesFormArray().removeAt( this.getSourcesFormArray.length - 1 );
  }

  createNewTagControl(): void{
    this.getTagsFormArray().push(this.fb.control(''));
  }

  removeLastTagControl(): void{
    this.getTagsFormArray().removeAt( this.getTagsFormArray().length - 1);
  }

  getSourceFormGroup(formGroupName: AbstractControl): FormGroup{
    return formGroupName as FormGroup;
  }

  submit(): void{
    if (this.articleFormGroup.valid){
      const titleElement = document.getElementById('title');

      const title = this.articleFormGroup.value.title;
      const author = this.authService.getUserNameFromStorage();

      this.articleCreation.checkTitle(title, author).subscribe( (responce: any) => {
        if (responce.valid){
          console.log(this.articleFormGroup.value);
          titleElement?.classList.remove('red-border');
          this.articleCreation.createArticle(this.articleFormGroup.value).subscribe( (responce: any) => {
            if (responce.success){
              this.router.navigate(['/dashboard/' + this.authService.getUserIdfromStorage()]);
            }
          });
          return;
        }
        titleElement?.classList.add('red-border');
        titleElement?.scrollIntoView();
      });
    }
  }

}
