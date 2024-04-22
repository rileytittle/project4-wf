import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  emailFormControl = new FormControl("", [Validators.email, Validators.required])
  pwdFormControl = new FormControl("", [Validators.required])
  constructor(private todoService: TodoService, private _snackbar: MatSnackBar) {}

  LoginUser(){
    if(this.emailFormControl.value && this.pwdFormControl.value){
      this.todoService.LoginUser(this.emailFormControl.value, this.pwdFormControl.value)
    }
    else{
      this._snackbar.open("Please fill all the fields", "OK", {duration: 3000})
    }
  }
}
