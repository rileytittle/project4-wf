import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoInfo } from '../../model/todoinfo';
import { UserInfo } from '../../model/userinfo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{
  showFiller = false;
  todoArray: TodoInfo[] =[];
  userInfo: UserInfo | null = null;
  //ShowTodo: EventEmitter<number> = new EventEmitter<number>
  constructor(private todoService: TodoService) {}

  async ngOnInit() {
    console.log("Initiated")
    this.todoArray = await this.todoService.GetTodos()
    this.userInfo = this.todoService.currentUserInfo;
  }

  ngOnDestroy(){
    console.log("Destroyed")
    this.todoService.todoToShow = null;
  }

  showTodoList(listId: number){
    this.todoService.GetTodo(listId);
  }
}
