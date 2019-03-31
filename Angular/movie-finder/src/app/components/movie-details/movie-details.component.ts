import {Component, OnInit } from '@angular/core';
import MovieDetails from '../../models/MovieDetails';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movie: MovieDetails;
  genres: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.movie = this.route.snapshot.data['singleMovie'];
    this.movie.genres = this.movie.genres.map(x => x['name']);
  }
}
