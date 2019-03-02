import React, {Component} from 'react';
import './Login.css';
import {Redirect} from "react-router-dom";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(event) {
        const name = event.target.name;

        if(this.state.hasOwnProperty(name)) {
            const value = event.target.value;

            this.setState({
                [name]: value,
            })
        }
    }

    onSubmitHandler(event) {
        event.preventDefault();

        this.props.login(this.state);
    }

    render() {

        if(this.props.user.isLoggedIn) {
            return <Redirect to="/"/>
        }

        return (
            <div className="Login">
                <div className="Login"><h1>Login</h1>
                    <form onSubmit={this.onSubmitHandler}>
                        <label htmlFor="usernameLogin">Username</label>
                        <input type="text" onChange={this.onChangeHandler} name="username" id="usernameLogin" placeholder="Ivan Ivanov"/>
                        <label htmlFor="passwordLogin">Password</label>
                        <input type="password" onChange={this.onChangeHandler} name="password" id="passwordLogin" placeholder="******"/>
                        <input type="submit" value="Login"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
