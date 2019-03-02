import React, {Component, Fragment} from 'react';
import './App.css';
import Article from "../Article/Article";
import RegisterForm from "../RegisterForm/RegisterForm";
import Navigation from "../Navigation/Navigation";
import warningWrapper from "../../hoc/warningWrapper";
import errorHandlingWrapper from "../../hoc/errorHandlingWrapper";
import BindingForm from "../BindingForm/BindingForm";

const ArticleWithWarning = warningWrapper(errorHandlingWrapper(Article));
const NavigationWithWarning = warningWrapper(errorHandlingWrapper(Navigation));
const RegisterFormWithWarning = warningWrapper(errorHandlingWrapper(RegisterForm));

class App extends Component {

    onSubmit(e, data) {
        e.preventDefault();
        console.log(data);
    }

    render() {
        return (
            <section className="App">
                <BindingForm onSubmit={this.onSubmit}>
                    <h1>Login</h1>
                    <input type="text" name="username" placeholder="username"/>
                    <input type="password" name="password" placeholder="password"/>
                </BindingForm>
                <BindingForm onSubmit={this.onSubmit}>
                    <h1>Register</h1>
                    <input type="text" name="username" placeholder="username"/>
                    <input type="password" name="password" placeholder="password"/>
                    <input type="password" name="repassword" placeholder="repeat password"/>
                </BindingForm>
                <ArticleWithWarning/>
                <RegisterFormWithWarning/>
                <NavigationWithWarning/>
            </section>
        );
    }
}

export default App;
