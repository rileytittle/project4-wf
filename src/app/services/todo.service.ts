import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first, firstValueFrom, of } from 'rxjs';
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
  selectedTodoList: TodoInfo | null=null;
  todoListCreated: Date | null=null;
  dateString: string | null=null;
  constructor(private httpClient:HttpClient, private _snackBar: MatSnackBar) { }

  async CreateTodo(title:string, listStatus:string){
    let headers = new HttpHeaders({
      "authorization": `Bearer ${this.currentUserToken?.token}`
    })
    let todoData;
    if(listStatus == "Public"){
      todoData = {
        "title": title,
        "public_list": true
      }
    }
    else{
      todoData = {
        "title": title,
        "public_list": false
      }
    }
    try{
      let todoList = await firstValueFrom(this.httpClient.post(`${environment.BASE_URL}/todo/`, todoData, {headers: headers}));
      return firstValueFrom(of(true));
    }
    catch(err:any){
      if(err.status == 400){
        this._snackBar.open("Title is required", "Ok", {duration: 3000});
      }
      if(err.status == 401){
        this._snackBar.open("Unauthorized", "Ok", {duration: 3000});
      }
      return firstValueFrom(of(true));
    }
  }

  async GetTodo(listId:number){
    let headers = new HttpHeaders({
      "authorization": `Bearer ${this.currentUserToken?.token}`
    })
    try{
      if(this.currentUserToken){
        let receivedTodo = await firstValueFrom(this.httpClient.get<TodoInfo>(`${environment.BASE_URL}/todo/${listId}`, {headers: headers}));
        this.selectedTodoList = receivedTodo;
      }
      else{
        let receivedTodo = await firstValueFrom(this.httpClient.get<TodoInfo>(`${environment.BASE_URL}/todo/${listId}`));
        this.selectedTodoList = receivedTodo;
      }
      this.todoListCreated = new Date(this.selectedTodoList.created_at)
      let month = this.todoListCreated.toLocaleString("default", { month: "long" });
      let day = this.todoListCreated.getDate();
      let year = this.todoListCreated.getFullYear();
      this.dateString = `${month} ${day}, ${year}`
      return firstValueFrom(of(true));
    }
    catch(err:any){
      if(err.status == 401){
        this._snackBar.open("Unauthorized", "Ok", {duration: 3000});
      }
      else if(err.status == 404){
        this._snackBar.open("Todo list not found", "Ok", {duration: 3000});
      }
      return firstValueFrom(of(false));
    }
  }
  async GetTodos(){
    if(this.currentUserInfo){
      console.log("called")
      return firstValueFrom(of(this.todoArray))
    }
    else{
      console.log("calledx")
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
  async UpdateUserInfo(currentPassword:string, name:string, email:string, password:string){
    let headers = new HttpHeaders({
      "authorization": `Bearer ${this.currentUserToken?.token}`
    })
    let userData;
    if(password == "use current"){
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
      let newUserInfo = await firstValueFrom(this.httpClient.patch<UserInfo>(`${environment.BASE_URL}/user`, userData, {headers: headers}));
      this.LogOut();
      return true;
    }
    catch(err:any){
      if(err.status == 400){
        this._snackBar.open("Email already in use, try another", "Ok", {duration: 3000});
        return false;
      }
      else if(err.status == 401){
        this._snackBar.open("Incorrect password", "Ok", {duration: 3000});
        return false;
      }
      return false;
    }
  }
  LogOut(){
    this.currentUserInfo = null;
    this.currentUserToken = null;
  }
}
