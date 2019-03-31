import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterFormTemplateComponent } from './components/register-form-template/register-form-template.component';
import { RegisterFormReactiveComponent } from './components/register-form-reactive/register-form-reactive.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ImageUrlValidationDirective } from './directives/image-url-validation.directive';

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormTemplateComponent,
    RegisterFormReactiveComponent,
    ImageUrlValidationDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
