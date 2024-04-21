import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private todoService:TodoService) {}
  nameFormControl = new FormControl("", [Validators.required])
  emailFormControl = new FormControl("", [Validators.required, Validators.email])
  pwdFormControl = new FormControl("", [Validators.required, Validators.minLength(8)])

  CreateUser(){
    if(this.nameFormControl.value && this.emailFormControl.value && this.pwdFormControl.value){
      this.todoService.CreateUser(this.nameFormControl.value, this.emailFormControl.value, this.pwdFormControl.value)
    }
  }
}
