import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { UserToken } from '../model/usertoken';
import { UserInfo } from '../model/userinfo';
import { TodoInfo } from '../model/todoinfo';
const BASE_URL = "https://unfwfspring2024.azurewebsites.net/";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  currentUserToken: UserToken | null = null;
  UserLoggedIn: EventEmitter<boolean> = new EventEmitter<boolean>;
  currentUserInfo: UserInfo | null = null;
  todoArray: TodoInfo[] = [];
  constructor(private httpClient:HttpClient, private _snackBar: MatSnackBar) { }

  async GetTodos(){
    if(this.currentUserInfo){
      return this.todoArray
    }
    else{
      this.todoArray = await firstValueFrom(this.httpClient.get<TodoInfo[]>(`${BASE_URL}/todo`));
      return this.todoArray
    }
  }
  async CreateUser(name:string, email:string, password:string){
    let userData = {
      name: name,
      password: password,
      email: email
    }
    try{
      let response = await firstValueFrom(this.httpClient.post("https://unfwfspring2024.azurewebsites.net/user", userData))
      console.log(response)
      return true
    }
    catch(err:any){
      if(err.status == 400){
        this._snackBar.open("User already exists", "OK", {duration: 3000})
      }
      return false
    }
  }

  async LoginUser(email:string, password:string){
    const encodedHeaders = btoa(`${email}:${password}`)

    try{
      //let userData = await firstValueFrom(this.httpClient.post(`${BASE_URL}/user/${email}/${password}`))
    }
    catch(err:any){

    }
  }
}
