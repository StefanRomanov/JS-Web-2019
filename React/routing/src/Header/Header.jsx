import React, {Component, Fragment} from 'react';
import {NavLink} from "react-router-dom";

import './Header.css';

class Header extends Component {

    render() {
        console.log(this.props);
        return (
            <header>
                <NavLink to="/" className="logo">Interactive IMDB</NavLink>
                <div className="header-right">
                    <NavLink to="/">Home</NavLink>
                    {
                        this.props.user.isLoggedIn ?
                            <Fragment>
                                <a href="#">Welcome {this.props.user.username}</a>
                                <span>
                                    {this.props.user.isAdmin ? <NavLink to="/movie/create">Create</NavLink> : null}
                                </span>
                                <a onClick={this.props.logout}>Logout</a>
                            </Fragment>
                            :
                            <Fragment>
                                <span>
                                    <NavLink to="/register">Register</NavLink>
                                    <NavLink to="/login">Login</NavLink>
                                </span>
                            </Fragment>
                    }
                </div>
            </header>
        )
    }
}

export default Header;