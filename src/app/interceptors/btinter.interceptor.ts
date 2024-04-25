import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { finalize } from 'rxjs';

export const btinterInterceptor: HttpInterceptorFn = (req, next) => {
  let todoService = inject(TodoService);
  todoService.showProgressBar = true;
  if(todoService.currentUserToken){
    req = req.clone({
      setHeaders:{
        "Authorization": `Bearer ${todoService.currentUserToken.token}`
      }
    })
  }
  return next(req).pipe(
    finalize(() =>{
      todoService.showProgressBar = false;
    })
  )
};
