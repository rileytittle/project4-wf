import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoInfo } from '../../model/todoinfo';
import { UserInfo } from '../../model/userinfo';
import { TodoItem } from '../../model/todoitem';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent implements OnInit, OnDestroy{
  titleFormControl = new FormControl("", [Validators.required]);
  dateFormControl = new FormControl("");
  taskCompleteFormControl = new FormControl("", [Validators.required]);
  selectedTodoList: TodoInfo | null=null;
  dateString: string | null=null;
  currentUserInfo: UserInfo | null=null;
  constructor(private todoService: TodoService, private router:Router, private _snackBar:MatSnackBar){ }
  ngOnInit(): void {
    this.selectedTodoList = this.todoService.selectedTodoList;
    this.dateString = this.todoService.dateString;
    this.currentUserInfo = this.todoService.currentUserInfo;
  }
  ngOnDestroy(): void {
      this.selectedTodoList = null;
      this.dateString = null;
  }
  async ShowItemCreator(){
    //makes the item creator form appear
    this.todoService.todoListToMakeItemFor = this.todoService.selectedTodoList;
    this.router.navigate(["/createtodoitem"])
  }
  async DeleteList(){
    let deletionSuccessful = await this.todoService.DeleteList(this.selectedTodoList!.id);
    if(deletionSuccessful){
      this.router.navigate(["/message"])
    }
  }
  async DeleteItem(item:TodoItem){
    let success = await this.todoService.DeleteItem(item);
    if(success){
      this.router.navigate(['message'])
    }
  }
  async UpdateItem(item:TodoItem){
    console.log(item)
    let success = await this.todoService.UpdateItem(item);
    if(!success){
      this._snackBar.open("There was a problem updating the item", "Ok", {duration: 3000});
    }
  }
  async ShareItem(){
    this.todoService.todoListToShare = this.todoService.selectedTodoList;
    this.router.navigate(["/share"])
  }
  ListSharedWithUser(){
    if(this.selectedTodoList && this.currentUserInfo){
      for(let user of this.selectedTodoList.shared_with){
        if(this.currentUserInfo.email == user.email){
          return true;
        }
      }
      return false;
    }
    else{
      return false;
    }
  }
}
