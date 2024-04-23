import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-updateaccount',
  templateUrl: './updateaccount.component.html',
  styleUrl: './updateaccount.component.css'
})
export class UpdateaccountComponent {
  constructor(private todoService:TodoService, private _snackbar: MatSnackBar, private router: Router) {}
  nameFormControl = new FormControl(`${this.todoService.currentUserInfo?.name}`)
  emailFormControl = new FormControl(`${this.todoService.currentUserInfo?.email}`, [Validators.email])
  pwdFormControl = new FormControl("Enter a new password if you wish", [Validators.minLength(8)])

  async UpdateUserInfo(){
    let fieldsToAdd: string[] = [];
    let name = "";
    let email = "";
    let password = "";
    if(this.nameFormControl.value){
      fieldsToAdd.push("name");
      name = this.nameFormControl.value;
    }
    if(this.emailFormControl.value && this.emailFormControl.valid && this.emailFormControl.value != this.todoService.currentUserInfo?.email){
      fieldsToAdd.push("email");
      email = this.emailFormControl.value;
    }
    if(this.pwdFormControl.value && this.pwdFormControl.valid){
      fieldsToAdd.push("password");
      password = this.pwdFormControl.value;
    }
    let updateSuccessful = await this.todoService.UpdateUserInfo(fieldsToAdd, name, email, password);
    if(updateSuccessful){
      this.router.navigate(["/account"]);
    }
  }
}
