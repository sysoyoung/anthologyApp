import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.scss']
})
export class ArticleCreationComponent implements OnInit {

  articleFormGroup!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.articleFormGroup = this.fb.group({
      title: ['Приклад хорошого заголовку', Validators.required],
      lang: ['укр'],
      description: ['Дуже короткий опис статті'],
      sources: this.fb.array([
        this.fb.group({
          title: ['Приклад: Онтологічне моделювання'],
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
      console.log(this.articleFormGroup.value);
    }
    console.log('submited');
  }

}
