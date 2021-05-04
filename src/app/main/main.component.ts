import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  searchIcon = faSearch;
  searchControl!: FormControl;
  searchValue = '';

  constructor(
    private searchService: SearchService,
    private titlePage: Title
    ) { }

  ngOnInit(): void {
    this.searchControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.titlePage.setTitle('Anthology');
  }

  search(): void{
    if (this.searchControl?.valid){
      this.searchService.setSearchValue(this.searchControl.value);
      this.searchService.navigateToSearch();
    }
    return;
  }
}
