import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoInfo } from '../../model/todoinfo';
import { UserInfo } from '../../model/userinfo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  showFiller = false;
  todoArray: TodoInfo[] =[];
  userInfo: UserInfo | null = null;
  constructor(private todoService: TodoService) {}

  async ngOnInit() {
      this.todoArray = await this.todoService.GetTodos()
      this.userInfo = this.todoService.currentUserInfo;
  }
}
