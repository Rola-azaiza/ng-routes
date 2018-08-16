import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {PhotosComponent} from './photos/photos.component';
import {PhotoComponent} from './photo/photo.component';

const routes: Routes = [
  // basic routes
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'contactus', redirectTo: 'contact' },
  { path: 'photos', component: PhotosComponent },
  { path: 'photo/:id', component: PhotoComponent },

  {path: '**', component: HomeComponent}
];

export default RouterModule.forRoot(routes);
