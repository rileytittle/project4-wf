import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-createtodoitem',
  templateUrl: './createtodoitem.component.html',
  styleUrl: './createtodoitem.component.css'
})
export class CreatetodoitemComponent {
  titleFormControl = new FormControl("", [Validators.required]);
  dateFormControl = new FormControl("");
  constructor(private todoService: TodoService){}

  async CreateItem(){
    
  }
}
