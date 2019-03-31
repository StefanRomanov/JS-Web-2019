import {Component, OnInit} from '@angular/core';
import Movie from '../../models/Movie';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  popular: Movie[];
  inTheaters: Movie[];
  forKids: Movie[];
  drama: Movie[];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.popular = this.route.snapshot.data['movies'][0];
    this.inTheaters = this.route.snapshot.data['movies'][1];
    this.forKids = this.route.snapshot.data['movies'][2];
    this.drama = this.route.snapshot.data['movies'][3];
  }
}
