import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './dashboard/user.service';


@Injectable()
export class IsLoggedIn implements CanActivate {

    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    canActivate(): boolean{
        if (this.userService.isLoggedIn()){
            return true;
        }
        this.router.navigate(['/authentication']);
        return false;
    }
}
