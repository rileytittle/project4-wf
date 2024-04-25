import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-createtodoitem',
  templateUrl: './createtodoitem.component.html',
  styleUrl: './createtodoitem.component.css'
})
export class CreatetodoitemComponent {
  titleFormControl = new FormControl("", [Validators.required]);
  dateFormControl = new FormControl("");
  constructor(private todoService: TodoService, private _snackBar: MatSnackBar, private router:Router, private datePipe: DatePipe){}

  async CreateItem(){
    if(this.titleFormControl.value && this.titleFormControl.valid){
      //console.log(this.titleFormControl.value, this.dateFormControl.value?.toString())
      if(this.dateFormControl.value){
        console.log(this.dateFormControl.value.toString())
        const originalDate = new Date(this.dateFormControl.value.toString());
        const isoFormattedDate = this.datePipe.transform(originalDate, 'yyyy-MM-ddTHH:mm:ssZ');
        if(isoFormattedDate){
          const date = new Date(isoFormattedDate);
          const utcDateTimeString = date.toISOString();
          console.log(utcDateTimeString); // Output: 2024-04-25T04:00:00.000Z
          let creationSuccessful = await this.todoService.CreateItem(this.titleFormControl.value, utcDateTimeString);
          if(creationSuccessful){
            this.router.navigate(["/"])
          }
        }
      }
      else{
        let creationSuccessful = await this.todoService.CreateItem(this.titleFormControl.value, "no due date");
        if(creationSuccessful){
          this.router.navigate(["/"])
        }
      }
    }
    else{
      this._snackBar.open("You must provide a title for the task", "Ok", {duration: 3000});
    }
  }
}
