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
// import {HashLocationStrategy, LocationStrategy} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    PhotosComponent,
    PhotoDetailsComponent,
    PhotoComponent
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
