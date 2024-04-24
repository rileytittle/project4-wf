import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-createtodo',
  templateUrl: './createtodo.component.html',
  styleUrl: './createtodo.component.css'
})
export class CreatetodoComponent {
  titleFormControl = new FormControl("", [Validators.required])
  publicStatusFormControl = new FormControl("", [Validators.required])
  constructor(private todoService: TodoService, private router:Router){}
  async CreateTodo(){
    if((this.titleFormControl.valid && this.publicStatusFormControl.valid) && (this.titleFormControl.value && this.publicStatusFormControl.value)){
      let creationSuccessful = await this.todoService.CreateTodo(this.titleFormControl.value, this.publicStatusFormControl.value);
      if(creationSuccessful){
        this.router.navigate(["/"])
      }
    }
  }
}
