import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { TodoService } from '../services/todo.service';

export const noauthGuard: CanActivateFn = (route, state) => {
  let todoService = inject(TodoService);
  if(todoService.currentUserInfo){
    return true;
  }
  else{
    return false;
  }
};
