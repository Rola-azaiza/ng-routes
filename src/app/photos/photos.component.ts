import { Component, OnInit } from '@angular/core';
import {PhotosService} from '../services/photos.service';
import {Photo} from '../models/photo';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  loading: boolean;
  photos: Photo[];
  query: string;
  constructor(
    private photosService: PhotosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams
      .subscribe((params: any) => {
        this.query = params['query'] || '';
      });
  }

  ngOnInit() {
    this.getPhotos();
  }
  getPhotos() {
    this.loading = true;
    this.photosService.getPhotos(this.query)
      .subscribe(
        (photos: Photo[]) => {
          this.loading = false;
          this.photos = photos;
        });
  }
  submit(query: string): void {
    this.router.navigate(['photos'], { queryParams: { query: query } })
      .then(_ => this.getPhotos()
      );
  }

}
