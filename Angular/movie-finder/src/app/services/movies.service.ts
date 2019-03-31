import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import Movie from '../models/Movie';
import {map} from 'rxjs/operators';
import MovieDetails from '../models/MovieDetails';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '&api_key=bc880b9f56b50b1372989dc6f6d4a141';
const API_KEY_ALT = '?api_key=bc880b9f56b50b1372989dc6f6d4a141';
const POPULAR_ENDPOINT = '/discover/movie?sort_by=popularity.desc';
const IN_THEATER_ENDPOINT = '/discover/movie?primary_release_date.gte=2019-02-15&primary_release_date.lte=2019-03-22';
const KIDS_ENDPOINT = '/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc';
const DRAMA_ENDPOINT = '/discover/movie?with_genres=18&primary_release_year=2019';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getMovie(id: string) {
    return this.http.get<MovieDetails>(BASE_URL + `/movie/${id}` + API_KEY_ALT);
  }

  getPopular() {
    return this.http.get<Movie[]>(BASE_URL + POPULAR_ENDPOINT + API_KEY)
      .pipe( map( x => x['results'].slice(0, 6)));
  }

  getTheaters() {
    return this.http.get<Movie[]>(BASE_URL + IN_THEATER_ENDPOINT + API_KEY)
      .pipe( map( x => x['results'].slice(0, 6)));
  }

  getKidMovies() {
    return this.http.get<Movie[]>(BASE_URL + KIDS_ENDPOINT + API_KEY)
      .pipe( map( x => x['results'].slice(0, 6)));
  }

  getDramaMovies() {
    return this.http.get<Movie[]>(BASE_URL + DRAMA_ENDPOINT + API_KEY)
      .pipe( map( x => x['results'].slice(0, 6)));
  }

  searchMovies(query: string) {
    console.log(query);
    return this.http.get<Movie[]>(BASE_URL + '/search/movie' + API_KEY_ALT + `&query=${query}`);
  }
}
