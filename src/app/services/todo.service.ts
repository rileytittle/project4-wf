import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom, of } from 'rxjs';
import { UserToken } from '../model/usertoken';
import { UserInfo } from '../model/userinfo';
import { TodoInfo } from '../model/todoinfo';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  currentUserToken: UserToken | null = null;
  UserLoggedIn: EventEmitter<boolean> = new EventEmitter<boolean>;
  currentUserInfo: UserInfo | null = null;
  todoArray: TodoInfo[] = [];
  todoToShow: number | null = null;
  constructor(private httpClient:HttpClient, private _snackBar: MatSnackBar) { }

  async GetTodos(){
    if(this.currentUserInfo){
      return firstValueFrom(of(this.todoArray))
    }
    else{
      this.todoArray = await firstValueFrom(this.httpClient.get<TodoInfo[]>(`${environment.BASE_URL}/todo`));
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
      let newUser = await firstValueFrom(this.httpClient.post(`${environment.BASE_URL}/user`, userData))
      console.log(newUser);
      return newUser;
    }
    catch(err:any){
      if(err.status == 400){
        this._snackBar.open("User already exists", "OK", {duration: 3000});
      }
      return firstValueFrom(of(null));
    }
  }

  async LoginUser(email:string, password:string){
    let userData = {
      email: email,
      password: password
    }
    let basicAuthHeader = btoa(`${email}:${password}`)
    try{
      let headers = new HttpHeaders({
        "authorization": `Basic ${basicAuthHeader}`
      });
      console.log(basicAuthHeader)
      let userToken = await firstValueFrom(this.httpClient.post<UserToken>(`${environment.BASE_URL}/user/login`, userData, {headers: headers}));
      this.currentUserToken = new UserToken
      this.currentUserToken.token = userToken.token;
      console.log(this.currentUserToken.token)
      return true;
    }
    catch(err:any){
      if(err.status == 401){
        this._snackBar.open("Invalid username or password", "Ok", {duration: 3000});
      }
      return false;
    }
  }

  async GetUserInfo(){
    let headers = new HttpHeaders({
      "authorization": `Bearer ${this.currentUserToken?.token}`
    })
    try{
      let userInfo = await firstValueFrom(this.httpClient.get<UserInfo>(`${environment.BASE_URL}/user`, {headers: headers}));
      this.currentUserInfo = userInfo;
      console.log(this.currentUserInfo.id)
      console.log(this.currentUserInfo.email)
      console.log(this.currentUserInfo.name)
    }
    catch(err:any){
      alert("There was an error. Try logging in again...");
    }
  }
  async UpdateUserInfo(name:string, email:string, password:string){
    let userData;
    if(password == "keep old"){
      userData = {
        name: name,
        email: email
      }
    }
    else{
      userData = {
        name: name,
        email: email,
        password: password
      }
    }
    try{
      let newUserInfo = await firstValueFrom(this.httpClient.patch<UserInfo>(`${environment.BASE_URL}/user`, userData));
      this.currentUserInfo = newUserInfo;
      await this.LoginUser(this.currentUserInfo.email, password);
      return true;
    }
    catch(err:any){
      if(err.status == 400){
        this._snackBar.open("Email already in use, try another", "Ok", {duration: 3000});
        return false;
      }
      else if(err.status == 401){
        this._snackBar.open("Not authorized", "Ok", {duration: 3000});
        return false;
      }
      return false;
    }
  }
  ShowTodo(listId: number){
    this.todoToShow = listId;
  }
}
