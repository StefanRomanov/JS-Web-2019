import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {MoviesService} from '../movies.service';
import Movie from '../../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieSearchResolver implements Resolve<Movie[]> {
  constructor(private MovieService: MoviesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Movie[]> {
    const query = route.queryParams['query'];
    return this.MovieService.searchMovies(query);
  }
}
