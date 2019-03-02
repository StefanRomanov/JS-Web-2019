import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import './Register.css';
import {toast} from "react-toastify";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            email: null
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

        fetch('http://localhost:9999/auth/signup', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((data) => {

                if(this.state.username === data.username) {
                    const userToLogin = {
                        username: this.state.username,
                        password: this.state.password,
                    };

                    this.props.login(userToLogin);

                    toast.success(data.message);
                } else {
                    toast.error(data.message);
                    data.errors.forEach((err) => {
                        toast.error(err.msg);
                    });
                }
            })
            .catch(console.log);
    }


    render() {

        if(this.props.user.isLoggedIn){
            return <Redirect to="/"/>
        }

        return (
            <div className="Register">
                <div className="Register"><h1>Register</h1>
                    <form onSubmit={this.onSubmitHandler}>
                        <label htmlFor="username">Username</label>
                        <input type="text" onChange={this.onChangeHandler} name="username" id="username"
                               placeholder="Ivan Ivanov"/>
                        <label htmlFor="email">Email</label>
                        <input type="text" onChange={this.onChangeHandler} name="email" id="email"
                               placeholder="ivan@gmail.com"/>
                        <label htmlFor="password">Password</label>
                        <input type="password" onChange={this.onChangeHandler} name="password" id="password"
                               placeholder="******"/>
                        <input type="submit" value="REGISTER"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;
