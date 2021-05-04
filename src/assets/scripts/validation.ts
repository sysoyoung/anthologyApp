import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(passControl: AbstractControl): object | null{
    if (/^[a-zA-Z0-9_]{4,}$/.test(passControl?.value)){
      return null;
    }
    return {message: `should consist of eng letters, numbers or _`};
}

export function requiredValidator(formControl: AbstractControl): object | null{
  if (formControl?.value.trim() === '' || formControl?.value === undefined){
    return { message: 'required'} ;
  }
  return null;
}

export function emailValidator(emailControl: AbstractControl): object | null{
  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailControl.value.trim())){
    return null;
  }
  return { message: 'email not valid'} ;
}

export function minLengthValidator(n: number, inputName: string): ValidatorFn{
  return (formControl: AbstractControl): object | null => {
    if (formControl.value.trim().length < n){
      return { message: inputName + ' is to short'};
    }
    return null;
  };
}
