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
  pwdFormControl = new FormControl("", [Validators.minLength(8)])
  oldPwdFormControl = new FormControl("", [Validators.required, Validators.minLength(8)])
  async UpdateUserInfo(){
    let name = "";
    let email = "";
    let password = "";
    let currentPassword = "";
    if(this.emailFormControl.invalid){
      this._snackbar.open("Email address must be valid email", "Ok", {duration: 3000});
      
    }
    else{
      if(this.oldPwdFormControl.value && this.oldPwdFormControl.valid){
        currentPassword = this.oldPwdFormControl.value;
        if(this.nameFormControl.value){
          name = this.nameFormControl.value;
        }
        else{
          name = this.todoService.currentUserInfo!.name;
        }
        if(this.emailFormControl.value){
          email = this.emailFormControl.value;
        }
        else{
          email = this.todoService.currentUserInfo!.email;
        }
        if(this.pwdFormControl.valid){
          if(this.pwdFormControl.value){
            password = this.pwdFormControl.value;
          }
          else{
            password = "use current";
          }
          let updateSuccessful = await this.todoService.UpdateUserInfo(currentPassword, name, email, password);
          if(updateSuccessful){
            this.router.navigate(["/"]);
          }
        }
        else{
          this._snackbar.open("New Password must be 8 characters long", "Ok", {duration: 3000});
        }
      }
      else{
        this._snackbar.open("You must provide the current password", "Ok", {duration: 3000});
      }
    }
  }
}
