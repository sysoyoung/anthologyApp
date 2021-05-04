import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Event, NavigationStart} from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchIcon = faSearch;
  searchControl!: FormControl;
  public showSearch = true;

  constructor(
    private router: Router,
    private searchService: SearchService
  ) {
    this.router.events.subscribe((event: Event) => {
      if ( event instanceof NavigationStart){
        this.isShowSearch(event.url);
      }
    });
  }

  isShowSearch(url: string): void{
    const urlPath = url.split('?')[0];
    if (urlPath === '/' || urlPath === '/search'){
      this.showSearch = false;
      return;
    }
    this.showSearch = true;
  }

  ngOnInit(): void {
    this.searchControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  }

  search(): void{
    if (this.searchControl?.valid){
      this.searchService.setSearchValue(this.searchControl.value);
      this.searchService.navigateToSearch();
    }
    return;
  }

}
