import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private todoService:TodoService, private _snackbar: MatSnackBar, private router: Router) {}
  nameFormControl = new FormControl("", [Validators.required])
  emailFormControl = new FormControl("", [Validators.required, Validators.email])
  pwdFormControl = new FormControl("", [Validators.required, Validators.minLength(8)])

  async CreateUser(){
    if(this.nameFormControl.value && this.emailFormControl.value && this.pwdFormControl.value){
      if(this.nameFormControl.valid && this.emailFormControl.valid && this.pwdFormControl.valid)
      {
        let newUser = await this.todoService.CreateUser(this.nameFormControl.value, this.emailFormControl.value, this.pwdFormControl.value)
        if(newUser){
          alert("Navigating to Login page...");
          this.router.navigate(["/login"]);
        }
      }
      else if(this.emailFormControl.invalid){
        this._snackbar.open("Please enter a valid email", "Ok", {duration: 3000});
      }
      else if(this.pwdFormControl.invalid){
        this._snackbar.open("Please enter a password that is at least 8 characters", "Ok", {duration: 3000});
      }
    }
    else{
      this._snackbar.open("Please fill all the fields", "OK", {duration: 3000});
    }
  }
}
