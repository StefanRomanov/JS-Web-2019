import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MovieDetailsComponent} from './components/movie-details/movie-details.component';
import {SingleMovieResolver} from './services/resolvers/singleMovieResolver';
import {MovieListsResolver} from './services/resolvers/movieListsResolver';
import {MoviesComponent} from './components/movies/movies.component';
import {MovieSearchComponent} from './components/movie-search/movie-search.component';
import {MovieSearchResolver} from './services/resolvers/movieSearchResolver';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home',
    component: MoviesComponent,
    pathMatch: 'full',
    resolve: {
      movies: MovieListsResolver
    } },
  {path: 'movies/:id',
    component: MovieDetailsComponent,
    resolve : {
        singleMovie: SingleMovieResolver
    }},
  {path: 'search',
    pathMatch: 'full',
    component: MovieSearchComponent,
    resolve : {
      movies: MovieSearchResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
