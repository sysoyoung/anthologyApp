import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { emailValidator, minLengthValidator, passwordValidator, requiredValidator } from 'src/assets/scripts/validation';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  emailControl!: FormControl;
  passwordControl!: FormControl;

  emailErr = '';
  passErr = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.emailControl = new FormControl('', [emailValidator, requiredValidator]);
    this.passwordControl = new FormControl('', [passwordValidator,
                                                minLengthValidator(4, 'password'),
                                                requiredValidator]);

  }

  userAuthClick(): boolean{

    this.emailErr = this.emailControl.valid ? '' : this.emailControl.errors?.message;
    this.passErr = this.passwordControl.valid ? '' : this.passwordControl.errors?.message;

    if (this.emailErr === '' && this.passErr === ''){
      this.authService.authUser({
        email: this.emailControl.value,
        password: this.passwordControl.value
      }).subscribe( (res: any) => {
        if (res.success){
          this.router.navigate(['/dashboard/' + res.user.id]);
          this.authService.storeUser( res.token, res.user);
          return;
        }
        if (res.message === 'wrong password'){
          this.passErr = res.message;
          return;
        }
        this.emailErr = res.message;
      });
    }
    return false;
  }

}
