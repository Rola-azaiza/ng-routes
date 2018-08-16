import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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

  getPhotos(query: string): Observable<Photo[]>  {
    const httpOptions = {};
    if(query) {
      httpOptions['params'] = new HttpParams().set('title', query)
    }
    return this.http.get(`${this.apiURL}/photos`, httpOptions).pipe(
      map((items: any[]) => {
        return items.map(item => new Photo(item));
      }));
  }

  getPhoto(id: number): Observable<Photo> {
    return this.http.get<Photo>(`${this.apiURL}/photos/${id}`);
  }
}
