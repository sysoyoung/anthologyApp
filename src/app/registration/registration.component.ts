import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { emailValidator, minLengthValidator, passwordValidator, requiredValidator } from 'src/assets/scripts/validation';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  nameControl!: FormControl;
  lastNameControl!: FormControl;
  emailControl!: FormControl;
  passwordControl!: FormControl;

  nameErr = '';
  lastNameErr = '';
  emailErr = '';
  passErr = '';

  constructor(
    private regService: RegistrationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.nameControl     = new FormControl('', [requiredValidator]);
    this.lastNameControl = new FormControl('', [requiredValidator]);
    this.emailControl    = new FormControl('', [emailValidator, requiredValidator]);
    this.passwordControl = new FormControl('', [passwordValidator,
                                                minLengthValidator(4, 'password'),
                                                requiredValidator]);
  }

  userRegisterClick(): boolean{

    this.nameErr     = !this.nameControl.valid     ? this.nameControl.errors?.message     : '';
    this.lastNameErr = !this.lastNameControl.valid ? this.lastNameControl.errors?.message : '';
    this.emailErr    = !this.emailControl.valid    ? this.emailControl.errors?.message    : '';
    this.passErr     = !this.passwordControl.valid ? this.passwordControl.errors?.message : '';

    if ( this.nameErr === '' && this.lastNameErr === '' &&
         this.emailErr === '' && this.passErr === '')
    {
      this.regService.registerUser({
        name: this.nameControl.value.trim() + ' ' + this.lastNameControl.value.trim(),
        email: this.emailControl.value,
        password: this.passwordControl.value
      }).subscribe( (res: any) => {
        if (res.success){
          this.router.navigate(['/authentication']);
          return;
        }
        this.emailErr = res.message;
      });
    }
    return false;
  }
}
