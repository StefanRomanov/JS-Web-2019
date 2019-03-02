import React, {Component, Fragment} from 'react';
import Trailer from '../Home/Trailer';
import StoryLine from '../Home/StoryLine';
import './Home.css'

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            showTrailer: false,
            showStoryLine: false,
            movieId: undefined,
        };

        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(event) {
        const name = event.target.name;
        const movieId = event.target.dataset.movieId;

        let newState = {
            showTrailer: false,
            showStoryLine: false,
            movieId,
        };

        if (!(this.state.movieId === movieId && this.state[name])) {
            newState[name] = true;
        }

        this.setState(newState);
    }

    componentDidMount() {
        fetch('http://localhost:9999/feed/movies', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    movies: data.movies,
                })
            })
            .catch(console.log);
    }

    render() {
        const movieToShow = this.state.movies.filter(movie => {
            return movie._id === this.state.movieId;
        })[0];

        return (
            <div className="Home">
                <h1>All movies</h1>
                {
                    movieToShow ?
                        (<Fragment>
                            {this.state.showTrailer ? <Trailer movie={movieToShow}/> : null}
                            {this.state.showStoryLine ? <StoryLine movie={movieToShow}/> : null}
                        </Fragment>)
                        : null
                }
                <ul className="movies">
                    {
                        this.state.movies.map((movie) => (
                            <li className="movie" key={movie._id}>
                                <h2>{movie.title}</h2>
                                <img src={movie.poster} alt="Poster"/>
                                {
                                    this.props.user.isLoggedIn
                                        ?
                                        (<span>
                                            <button name="showTrailer" data-movie-id={movie._id}
                                                    onClick={this.onClickHandler}>View Trailer</button>
                                            <button name="showStoryLine" data-movie-id={movie._id}
                                                    onClick={this.onClickHandler}>View Story Line</button>
                                            </span>)
                                        :
                                        null
                                }
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default Home;
