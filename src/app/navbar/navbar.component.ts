import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { UserInfo } from '../model/userinfo';
import { UserToken } from '../model/usertoken';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{
  constructor(public todoService: TodoService) {}
}
