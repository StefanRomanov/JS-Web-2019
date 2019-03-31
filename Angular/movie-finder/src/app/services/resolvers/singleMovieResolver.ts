import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import MovieDetails from '../../models/MovieDetails';
import {Observable} from 'rxjs';
import {MoviesService} from '../movies.service';

@Injectable({
  providedIn: 'root'
})
export class SingleMovieResolver implements Resolve<MovieDetails> {
  constructor(private MovieService: MoviesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MovieDetails> {
    const id = route.params['id'];

    return this.MovieService.getMovie(id);
  }
}
