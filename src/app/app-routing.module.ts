import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { HomeComponent } from './view/home/home.component';
import { SignupComponent } from './view/signup/signup.component';
import { AccountComponent } from './view/account/account.component';
import { UpdateaccountComponent } from './view/updateaccount/updateaccount.component';

const routes: Routes = [
  {
    path:"",
    component: HomeComponent
  },
  {
    path: "signup",
    component:SignupComponent
  },
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:"account",
    component: AccountComponent
  },
  {
    path:"updateaccount",
    component: UpdateaccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
