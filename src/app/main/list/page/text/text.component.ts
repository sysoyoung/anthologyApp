import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  @Input() text: any;

  constructor() { }

  ngOnInit(): void {
  }

  scrollToTitle(title: string): void{
    document.getElementById(title)?.scrollIntoView();
  }
}
