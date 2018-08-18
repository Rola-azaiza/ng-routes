import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

import RoutesModule from './routes.module';
import { PhotosComponent } from './photos/photos.component';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';
import { PhotoComponent } from './photo/photo.component';
import { NestedComponent } from './nested/nested.component';
import { Child1Component } from './nested/child1/child1.component';
import { Child2Component } from './nested/child2/child2.component';
import { LoginComponent } from './login/login.component';
import { ProtectedComponent } from './protected/protected.component';
import { SignupComponent } from './signup/signup.component';
// import {HashLocationStrategy, LocationStrategy} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    PhotosComponent,
    PhotoDetailsComponent,
    PhotoComponent,
    NestedComponent,
    Child1Component,
    Child2Component,
    LoginComponent,
    ProtectedComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutesModule
  ],
  providers: [
    // { provide: LocationStrategy, useClass: HashLocationStrategy }
    { provide: 'API_URL', useValue: 'https://jsonplaceholder.typicode.com'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
