import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { DropdownDirective } from './navigation/dropdown.directive';
import { CollapseDirective } from './navigation/collapse.directive';

import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './authentication/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FurnitureAllComponent } from './furniture/furniture-all/furniture-all.component';
import { CreateFurnitureComponent } from './furniture/create-furniture/create-furniture.component';
import { FurnitureDetailsComponent } from './furniture/furniture-details/furniture-details.component';
import { FurnitureUserComponent } from './furniture/furniture-user/furniture-user.component';
import {AuthInterceptor} from './interceptors/AuthInterceptor';
import {ResponseHandleInterceptor} from './interceptors/ResponseHandleInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    DropdownDirective,
    CollapseDirective,
    FurnitureAllComponent,
    CreateFurnitureComponent,
    FurnitureDetailsComponent,
    FurnitureUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseHandleInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
