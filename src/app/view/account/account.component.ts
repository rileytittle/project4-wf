import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Router } from '@angular/router';
import { UserInfo } from '../../model/userinfo';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit{
  constructor(private todoService: TodoService, private router: Router) {}
  currentUserInfo: UserInfo | null = null;
  ngOnInit(): void {
    this.currentUserInfo = this.todoService.currentUserInfo;
  }
  LogOut(){
    this.currentUserInfo = null;
    this.todoService.LogOut();
    this.router.navigate(["/"])
  }
}
