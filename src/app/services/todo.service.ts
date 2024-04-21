import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient:HttpClient) { }

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
    catch(err){
      console.log(err)
      return false
    }
  }
}
