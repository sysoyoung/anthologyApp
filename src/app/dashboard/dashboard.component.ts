import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user!: any;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe( (data: any) => {
      if (data.status){
        this.user = data;
        return;
      }
      this.userLogout();
    });
  }

  

  userLogout(): void{
    this.userService.logout();
  }
}
