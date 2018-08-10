import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Photo} from '../models/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(
    @Inject('API_URL') private apiURL: string,
    private http: HttpClient
  ) { }

  getPhotos(): Observable<Photo[]>  {
    return this.http.get(`${this.apiURL}/photos`).pipe(
      map((items: any[]) => {
        return items.map(item => new Photo(item));
      }));
  }
}
