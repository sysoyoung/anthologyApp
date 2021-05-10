import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.scss']
})
export class ArticleCreationComponent implements OnInit {

  additionListControl!: FormArray;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.additionListControl = this.formBuilder.array([this.createAdditionFromGroup()]);

  }

  createAdditionFromGroup(): FormGroup{
    return this.formBuilder.group({
      title: this.formBuilder.control('title'),
      link: this.formBuilder.control('link')
    });
  }

  pushAdditionFormGroup(): void{
    this.additionListControl.push(this.createAdditionFromGroup());
  }

  
}
