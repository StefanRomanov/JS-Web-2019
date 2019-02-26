import React, {Component} from 'react';
import './App.css';
import AppHeader from "./App/AppHeader";
import AppContent from "./App/AppContent";
import AppFooter from "./App/AppFooter";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            games: [],
            hasFetched: false,
            loginForm: false,
        }
    }

    registerUser(user) {
        this.postAuth(user,'signup')
    }

    loginUser(user) {
        this.postAuth(user,'signin')
    }

    logout(event) {
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        this.setState({
            user: null
        });
    }

    componentWillMount() {
        // TODO: check if there is a logged in user using the sessionStorage (if so, update the state, otherwise set the user to null)
        const username = localStorage.getItem('username');
        if (username) {
            this.setState({
                user: username
            })
        }
        // TODO: fetch all the games
        this.fetchGames();
    }

    createGame(data) {

        // TODO: create a game using fetch with a post method then fetch all the games and update the state
        fetch('http://localhost:9999/feed/game/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(() => {
                this.fetchGames();
            });
    }

    fetchGames(){
        fetch('http://localhost:9999/feed/games')
            .then(rawData => rawData.json())
            .then(data => {
                this.setState({
                    games: data.games
                })
            })
    }

    postAuth(user, route){
        fetch('http://localhost:9999/auth/' + route, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(body => {
                if (body.errors) {
                    body.errors.forEach(er => {
                        console.log(er)
                    })
                } else {
                    localStorage.setItem('username', body.username);
                    localStorage.setItem('userId', body.userId);
                    this.setState({
                        user: body.username
                    })
                }
            })
    }

    switchForm() {
        // TODO: switch the value of the loginForm property
        this.setState({
            loginForm : !this.state.loginForm
        })
    }

    render() {
        return (
            <main>
                <AppHeader
                    user={this.state.user}
                    logout={this.logout.bind(this)}
                    switchForm={this.switchForm.bind(this)}
                    loginForm={this.state.loginForm}
                />
                <AppContent
                    registerUser={this.registerUser.bind(this)}
                    loginUser={this.loginUser.bind(this)}
                    games={this.state.games}
                    createGame={this.createGame.bind(this)}
                    user={this.state.user}
                    loginForm={this.state.loginForm}
                />
                <AppFooter/>
            </main>
        )
    }
}

export default App;


