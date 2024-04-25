import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from './navbar/navbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import { LoginComponent } from './view/login/login.component';
import { HomeComponent } from './view/home/home.component';
import { SignupComponent } from './view/signup/signup.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { TodolistComponent } from './view/todolist/todolist.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AccountComponent } from './view/account/account.component';
import { UpdateaccountComponent } from './view/updateaccount/updateaccount.component';
import { CreatetodoComponent } from './view/createtodo/createtodo.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import { CreatetodoitemComponent } from './view/createtodoitem/createtodoitem.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { btinterInterceptor } from './interceptors/btinter.interceptor';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DatePipe } from '@angular/common';
import { MessageComponent } from './view/message/message.component';
import { ShareComponent } from './view/share/share.component';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    TodolistComponent,
    AccountComponent,
    UpdateaccountComponent,
    CreatetodoComponent,
    CreatetodoitemComponent,
    MessageComponent,
    ShareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSelectModule,
    MatDividerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatProgressBarModule,
    DatePipe,
    MatCheckboxModule
  ],
  providers: [
    provideNativeDateAdapter(),
    provideHttpClient(withInterceptors([btinterInterceptor])),
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
