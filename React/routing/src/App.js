import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";

import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';
import Create from './Create/Create';
import Header from './Header/Header'
import NotFound from './NotFound';
import './App.css';
import {toast, ToastContainer} from "react-toastify";

import 'react-toastify/dist/ReactToastify.min.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: null,
            username: null,
            userId: null,
            token: null,
            isAdmin: null
        };

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }


    login(user) {
        fetch('http://localhost:9999/auth/signin', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {

                if(!data.token || !data.username || !data.userId) {
                    toast.error(data.message);
                    return;
                }

                localStorage.setItem('username', data.username);
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('token', data.token);
                localStorage.setItem('isAdmin', data.isAdmin);

                this.setState({
                        isLoggedIn: true,
                        username: data.username,
                        userId: data.userId,
                        token: data.token,
                        isAdmin: data.isAdmin
                });

                console.log(this.state);
                toast.success(data.message);
            })
            .catch(toast.error);
    }

    logout(){
        localStorage.clear();

        this.setState({
            isLoggedIn: null,
            username: null,
            userId: null,
            token: null,
            isAdmin: null
        });

        toast.success("Logout successful!");
    }

    componentDidMount() {
        const username = localStorage.getItem('username');
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const isAdmin = localStorage.getItem('isAdmin');

        if(localStorage.getItem('token')) {
            this.setState({
                    isLoggedIn: true,
                    username: username,
                    userId: userId,
                    token: token,
                    isAdmin: isAdmin === "true",
            });
        }

        console.log(this.state);
    }

    render() {
        return (
            <div className="App">
                <Header user={this.state} logout={this.logout}/>
                <ToastContainer closeButton={false} />
                <Switch>
                    <Route exact path="/" render={() =>
                        <Home user={this.state}/>
                    }/>
                    <Route exact path="/register" render={() =>
                        <Register
                            login={this.login}
                            user={this.state}
                        />
                    }/>
                    <Route exact path="/login" render={() =>
                        <Login
                            login={this.login}
                            user={this.state}
                        />
                    }/>
                    <Route exact path="/movie/create" render={() =>
                        <Create
                            user={this.state}
                        />}
                    />
                    <Route component={NotFound} />
                </Switch>
            </div>
        );
    }
}

export default App;
