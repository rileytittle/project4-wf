import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent {
  constructor(public todoService: TodoService){ }
  
  async CreateItem(){
    this.todoService.createItem = true;
  }
}
