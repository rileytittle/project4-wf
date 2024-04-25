import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoInfo } from '../../model/todoinfo';
import { UserInfo } from '../../model/userinfo';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent implements OnInit, OnDestroy{
  titleFormControl = new FormControl("", [Validators.required]);
  dateFormControl = new FormControl("");
  selectedTodoList: TodoInfo | null=null;
  dateString: string | null=null;
  currentUserInfo: UserInfo | null=null;
  constructor(private todoService: TodoService, private router:Router){ }
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
  async ShareItem(){
    this.todoService.todoListToShare = this.todoService.selectedTodoList;
    this.router.navigate(["/share"])
  }
}
