import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import Movie from '../../models/Movie';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  movies: Movie[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.movies = data['movies']['results'];
    });
  }
}
