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
    let name = this.todoService.currentUserInfo!.name;
    let email = this.todoService.currentUserInfo!.email;
    let password = "keep old";
    if(this.pwdFormControl.value && this.pwdFormControl.valid){
      password = this.pwdFormControl.value;
    }
    if(this.nameFormControl.value){
      name = this.nameFormControl.value;
    }
    if(this.emailFormControl.value && this.emailFormControl.valid){
      email = this.emailFormControl.value;
    }
    let updateSuccessful = await this.todoService.UpdateUserInfo(name, email, password);
    if(updateSuccessful){
      this.router.navigate(["/account"]);
    }
  }
}
