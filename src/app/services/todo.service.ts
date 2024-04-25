import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first, firstValueFrom, of } from 'rxjs';
import { UserToken } from '../model/usertoken';
import { UserInfo } from '../model/userinfo';
import { TodoInfo } from '../model/todoinfo';
import { environment } from '../../environments/environment.development';
import { TodoItem } from '../model/todoitem';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  Working: EventEmitter<boolean> = new EventEmitter<boolean>
  currentUserToken: UserToken | null = null;
  UserLoggedIn: EventEmitter<boolean> = new EventEmitter<boolean>;
  currentUserInfo: UserInfo | null = null;
  todoArray: TodoInfo[] = [];
  todoToShow: number | null = null;
  selectedTodoList: TodoInfo | null=null;
  todoListToMakeItemFor: TodoInfo | null=null;
  todoListCreated: Date | null=null;
  dateString: string | null=null;
  showProgressBar: boolean = false;
  todoListToShare: TodoInfo | null = null;
  constructor(private httpClient:HttpClient, private _snackBar: MatSnackBar) { }

  async CreateTodo(title:string, listStatus:string){
    // let headers = new HttpHeaders({
    //   "authorization": `Bearer ${this.currentUserToken?.token}`
    // })
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
      let todoList = await firstValueFrom(this.httpClient.post(`${environment.BASE_URL}/todo/`, todoData));
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
  async DeleteList(id:number){
    try{
      await firstValueFrom(this.httpClient.delete(`${environment.BASE_URL}/todo/${id}`))
      return firstValueFrom(of(true))
    }
    catch(err:any){
      if(err.status == 401){
        this._snackBar.open("Unauthorized", "Ok", {duration: 3000});
      }
      else if(err.status == 403){
        this._snackBar.open("Not allowed to delete", "Ok", {duration: 3000});
      }
      else if(err.status == 404){
        this._snackBar.open("Todo list not found", "Ok", {duration: 3000});
      }
      return firstValueFrom(of(false))
    }
  }
  async ShareList(email:string){
    let userData = {
      email: email
    }
    try{
      if(this.todoListToShare){
        let receivedTodo = await firstValueFrom(this.httpClient.post<TodoInfo>(`${environment.BASE_URL}/todo/${this.todoListToShare.id}/share`, userData))
        return firstValueFrom(of(true))
      }
      return firstValueFrom(of(true))
    }
    catch(err:any){
      return firstValueFrom(of(false))
    }
  }
  async RemoveSharedUser(email:string){
    try{
      if(this.todoListToShare){
        let success = await firstValueFrom(this.httpClient.delete(`${environment.BASE_URL}/todo/${this.todoListToShare.id}/share/${email}`));
        return firstValueFrom(of(true));
      }
      return firstValueFrom(of(false))
    }
    catch(err:any){
      return firstValueFrom(of(false))
    }
  }
  async CreateItem(itemTitle:string, itemDate:string){
    // let headers = new HttpHeaders({
    //   "authorization": `Bearer ${this.currentUserToken?.token}`
    // })
    let itemData;

    if(itemDate == "no due date"){
      itemData = {
        "task":itemTitle
      }
    }
    else{
      itemData = {
        "task":itemTitle,
        "due_date":itemDate
      }
    }
    console.log(itemData)
    try{
      let returnedItem = await firstValueFrom(this.httpClient.post<TodoItem>(`${environment.BASE_URL}/todo/${this.todoListToMakeItemFor?.id}/item`, itemData));
      //this.GetTodo(returnedItem.todo_list_id);
      return returnedItem;
    }
    catch(err:any){
      if(err.status == 400){
        this._snackBar.open("Title is required", "Ok", {duration:3000});
      }
      else if(err.status == 401){
        this._snackBar.open("Unauthorized", "Ok", {duration:3000});
      }
      else if(err.status == 403){
        this._snackBar.open("Forbidden access", "Ok", {duration:3000});
      }
      else if(err.status == 404){
        this._snackBar.open("Todo list not found", "Ok", {duration:3000});
      }
      return firstValueFrom(of(false));
    }
  }

  async UpdateItem(item:TodoItem){
    let itemData = {
      task: item.task,
      due_date: item.due_date,
      completed: !item.completed
    }
    try{
      await firstValueFrom(this.httpClient.patch(`${environment.BASE_URL}/todo/${item.list_id}/item/${item.id}`, itemData))
      return firstValueFrom(of(true))
    }
    catch(err:any){
      if(err.status == 400){
        this._snackBar.open("Invalid value for due date", "Ok", {duration:3000});
      }
      else if(err.status == 401){
        this._snackBar.open("Not Authorized", "Ok", {duration:3000});
      }
      else if(err.status == 403){
        this._snackBar.open("Unauthorized to update", "Ok", {duration:3000});
      }
      else if(err.status == 404){
        this._snackBar.open("Todo list item not found", "Ok", {duration:3000});
      }
      return firstValueFrom(of(false))
    }
  }  
  async DeleteItem(item:TodoItem){
    try{
      let response = await firstValueFrom(this.httpClient.delete(`${environment.BASE_URL}/todo/${item.list_id}/item/${item.id}`));
      console.log("Deleted!")
      this.selectedTodoList = null;
      this.todoListToMakeItemFor = null;
      this.todoListToShare = null;
      return firstValueFrom(of(true))
    }
    catch(err:any){
      if(err.status == 401){
        this._snackBar.open("Not Authorized", "Ok", {duration:3000});
      }
      else if(err.status == 403){
        this._snackBar.open("Unauthorized to delete", "Ok", {duration:3000});
      }
      else if(err.status == 404){
        this._snackBar.open("Todo list item not found", "Ok", {duration:3000});
      }
      return firstValueFrom(of(false))
    }
  }
  async GetTodo(listId:number){
    // let headers = new HttpHeaders({
    //   "authorization": `Bearer ${this.currentUserToken?.token}`
    // })
    try{
      if(this.currentUserToken){
        let receivedTodo = await firstValueFrom(this.httpClient.get<TodoInfo>(`${environment.BASE_URL}/todo/${listId}`));
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
  //TODO: make private and shared lists of todolists
  async GetTodos(){
    if(this.currentUserInfo){
      // let headers = new HttpHeaders({
      //   "authorization": `Bearer ${this.currentUserToken?.token}`
      // })
      this.todoArray = await firstValueFrom(this.httpClient.get<TodoInfo[]>(`${environment.BASE_URL}/todo`));
      // for(let todo of this.todoArray){
      //   let receivedTodo = await firstValueFrom(this.httpClient.get<TodoInfo>(`${environment.BASE_URL}/todo/${todo.id}`, {headers: headers}));
      //   if(typeof receivedTodo !== "boolean"){
      //     if(receivedTodo.shared_with && receivedTodo.shared_with.length != 0){
      //       for(let user of receivedTodo.shared_with){
      //         if(user.email == this.currentUserInfo.email){
      //           this.todoSharedWMe.push(receivedTodo)
      //         }
      //       }
      //     }
      //   }
      // }
      return this.todoArray;
    }
    else{
      this.todoArray = await firstValueFrom(this.httpClient.get<TodoInfo[]>(`${environment.BASE_URL}/todo`));
      return this.todoArray;
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
    // let headers = new HttpHeaders({
    //   "authorization": `Bearer ${this.currentUserToken?.token}`
    // })
    try{
      let userInfo = await firstValueFrom(this.httpClient.get<UserInfo>(`${environment.BASE_URL}/user`));
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
    // let headers = new HttpHeaders({
    //   "authorization": `Bearer ${this.currentUserToken?.token}`
    // })
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
      let newUserInfo = await firstValueFrom(this.httpClient.patch<UserInfo>(`${environment.BASE_URL}/user`, userData));
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
