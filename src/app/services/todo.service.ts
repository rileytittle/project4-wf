import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient:HttpClient, private _snackBar: MatSnackBar) { }

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
    //not sure how this is supposed to be done because we have to use basic auth
  }
}
