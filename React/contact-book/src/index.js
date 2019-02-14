import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import './style/app.css';
import db from './data/contacts.json';
import * as serviceWorker from './serviceWorker';

//Variables and constants
let currentContactIndex = 0;

const render = () => {
    ReactDOM.render(<Main />, document.getElementById('root'));
}

const clickFunction = (index) => {
    currentContactIndex = index;
    render();
}

//Components
const Contact = () => {
    return db.map((contact, i) => {
        return <div className="contact" onClick={() => clickFunction(i)} key={i}>
            <span className="avatar small">&#9787;</span>
            <span className="title">{contact.firstName} {contact.lastName}</span>
        </div>
    });
};

const Details = (props) => {
    return <div className="content">
        <div className="info">
            <div className="col">
                <span className="avatar">&#9787;</span>
            </div>
            <div className="col">
                <span className="name">{props.contact.firstName}</span>
                <span className="name">{props.contact.lastName}</span>
            </div>
        </div>
        <div className="info">
            <span className="info-line">&phone; {props.contact.phone}</span>
            <span className="info-line">&#9993; {props.contact.email}</span>
        </div>
    </div>
}

const ContactsWrapper = () => {
    return <div id="list">
        <h1>Contacts</h1>
        <div className="content">
            <Contact />
        </div>
    </div>
}

const DetailsWrapper = () => {
    return <div id="details">
        <h1>Details</h1>
        <Details contact={db[currentContactIndex]} />
    </div>
}

const Main = () => {
    return <div className="container">
        <header>&#9993; Contact Book</header>
        <div id="book">
            <ContactsWrapper />
            <DetailsWrapper />
        </div>
        <footer>Contact Book SPA &copy; 2019</footer>
    </div>
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
