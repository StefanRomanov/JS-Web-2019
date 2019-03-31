import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {MoviesService} from '../movies.service';
import {forkJoin, Observable} from 'rxjs';
import Movie from '../../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieListsResolver implements Resolve<Movie[]> {

  constructor(private moviesService: MoviesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Movie[]> {
    return forkJoin(
      this.moviesService.getPopular(),
      this.moviesService.getTheaters(),
      this.moviesService.getKidMovies(),
      this.moviesService.getDramaMovies());
  }
}
