import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import './Create.css';

class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movie: {
                title: '',
                storyLine: '',
                trailerUrl: '',
                poster: '',
            },
            redirect: false,
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(event) {
        const name = event.target.name;

        if(this.state.movie.hasOwnProperty(name)) {
            const value = event.target.value;

            let movie = {...this.state.movie};
            movie[name] = value;

            this.setState({movie});
        }
    }

    onSubmitHandler(event) {
        event.preventDefault();

        if(!this.isMovieValid(this.state.movie)) {
            return;
        }

        fetch('http://localhost:9999/feed/movie/create', {
            method: 'POST',
            body: JSON.stringify(this.state.movie),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // TODO: Toastify success message.
                toast.success(data.message);

                this.setState({
                    redirect: true,
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    isMovieValid(movie) {
        let isValid = true;

        if(!movie.title || !movie.title.trim()) {
            toast.error("Title is required!");
            isValid = false;
        }
        if(!movie.storyLine || !movie.storyLine.trim()) {
            toast.error("Story line is required!");
            isValid = false;
        }
        if(!movie.trailerUrl || !movie.trailerUrl.trim()) {
            toast.error("Trailer Url is required!");
            isValid = false;
        }
        if(!movie.poster || !movie.poster.trim()) {
            toast.error("Poster Url is required!");
            isValid = false;
        }

        return isValid;
    }

    render() {
        if(!this.props.user.isAdmin || this.state.redirect) {
            return <Redirect to='/' />;
        }

        return (
            <div className="Create">
                <h1>Create Movie</h1>
                <form onSubmit={this.onSubmitHandler} >
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" placeholder="Titanic" onChange={this.onChangeHandler} value={this.state.movie.title} />

                    <label htmlFor="storyLine">Story Line</label>
                    <input type="text" id="storyLine" name="storyLine" placeholder="Text" onChange={this.onChangeHandler} value={this.state.movie.storyLine} />

                    <label htmlFor="trailerUrl">Trailer Url</label>
                    <input type="text" id="trailerUrl" name="trailerUrl" placeholder="https://www.youtube.com/watch?v=DNyKDI9pn0Q" onChange={this.onChangeHandler} value={this.state.movie.trailerUrl} />

                    <label htmlFor="poster">Movie Poster</label>
                    <input type="text" id="poster" name="poster" placeholder="https://encrypted-tbn0.gstatic.com/images...png" onChange={this.onChangeHandler} value={this.state.movie.poster} />

                    <input type="submit" value="Create" />
                </form>
            </div>
        );
    }
}

export default Create;
