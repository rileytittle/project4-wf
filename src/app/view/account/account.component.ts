import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  constructor(public todoService: TodoService, private router: Router) {}

  LogOut(){
    this.todoService.LogOut();
    this.router.navigate(["/"])
  }
}
