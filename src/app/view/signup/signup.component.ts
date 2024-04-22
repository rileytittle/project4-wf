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
      await this.todoService.CreateUser(this.nameFormControl.value, this.emailFormControl.value, this.pwdFormControl.value)
      this._snackbar.open("Navigating to Login page...", "Ok", {duration: 1000});
      this.router.navigate(["/login"]);
    }
    else{
      this._snackbar.open("Please fill all the fields", "OK", {duration: 3000});
    }
  }
}
