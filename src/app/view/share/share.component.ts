import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FormControl, Validators } from '@angular/forms';
import { TodoInfo } from '../../model/todoinfo';
import { UserInfo } from '../../model/userinfo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrl: './share.component.css'
})
export class ShareComponent implements OnInit, OnDestroy{
  emailFormControl = new FormControl("", [Validators.required, Validators.email]);
  selectedTodoList: TodoInfo | null=null;
  dateString: string | null=null;
  currentUserInfo: UserInfo | null=null;
  constructor(private todoService: TodoService, private _snackBar: MatSnackBar, private router:Router) { }
  ngOnInit(): void {
    this.selectedTodoList = this.todoService.todoListToShare;
    this.dateString = this.todoService.dateString;
    this.currentUserInfo = this.todoService.currentUserInfo;
  }
  ngOnDestroy(): void {
      this.selectedTodoList = null;
      this.dateString = null;
      this.currentUserInfo = null;
      this.todoService.todoListToShare = null;
  }
  async RemoveSharedUser(email:string){
    let success = await this.todoService.RemoveSharedUser(email);
    if(success){
      this.router.navigate(["/"])
    }
  }
  async ShareList(){
    if(this.emailFormControl.value && this.emailFormControl.valid){
      let success = await this.todoService.ShareList(this.emailFormControl.value);
      if(success){
        this.router.navigate(["/"])
      }
    }
    else{
      this._snackBar.open("You must provide the email", "Ok", {duration: 3000});
    }
  }
}
