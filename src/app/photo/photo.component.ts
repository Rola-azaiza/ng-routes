import { Component, OnInit } from '@angular/core';
import {PhotosService} from '../services/photos.service';
import {Photo} from '../models/photo';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  photo: Photo;
  id: any;
  constructor(
    private photosService: PhotosService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
      }
    )
  }

  ngOnInit() {
    this.photosService.getPhoto(this.id)
      .subscribe(
        (val: Photo) => {
          this.photo = val;
        }
      );
  }
}
