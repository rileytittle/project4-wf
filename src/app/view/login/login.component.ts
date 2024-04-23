import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  emailFormControl = new FormControl("", [Validators.email, Validators.required])
  pwdFormControl = new FormControl("", [Validators.required])
  constructor(private todoService: TodoService, private _snackbar: MatSnackBar, private router: Router) {}

  async LoginUser(){
    if(this.emailFormControl.value && this.pwdFormControl.value){
      if(this.emailFormControl.valid && this.pwdFormControl.valid){
        let userLoggedIn = await this.todoService.LoginUser(this.emailFormControl.value, this.pwdFormControl.value)
        if(userLoggedIn){
          await this.todoService.GetUserInfo();
          alert("Navigating to Home page...");
          this.router.navigate(["/"]);
        }
      }
      else if(this.emailFormControl.invalid){
        this._snackbar.open("Please enter a valid email", "Ok", {duration: 3000});
      }
      else if(this.pwdFormControl.invalid){
        this._snackbar.open("Please enter a valid password", "Ok", {duration: 3000});
      }
    }
    else{
      this._snackbar.open("Please fill all the fields", "OK", {duration: 3000})
    }
  }
}
