import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { HomeComponent } from './view/home/home.component';
import { SignupComponent } from './view/signup/signup.component';
import { AccountComponent } from './view/account/account.component';
import { UpdateaccountComponent } from './view/updateaccount/updateaccount.component';
import { CreatetodoComponent } from './view/createtodo/createtodo.component';
import { CreatetodoitemComponent } from './view/createtodoitem/createtodoitem.component';
import { noauthGuard } from './guards/noauth.guard';
import { MessageComponent } from './view/message/message.component';
import { ShareComponent } from './view/share/share.component';

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
    canActivate:[noauthGuard],
    component: AccountComponent
  },
  {
    path:"updateaccount",
    canActivate: [noauthGuard],
    component: UpdateaccountComponent
  },
  {
    path:"createtodo",
    canActivate: [noauthGuard],
    component: CreatetodoComponent
  },
  {
    path:"createtodoitem",
    canActivate: [noauthGuard],
    component: CreatetodoitemComponent
  },
  {
    path:"message",
    component: MessageComponent
  },
  {
    path:"share",
    canActivate: [noauthGuard],
    component: ShareComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
