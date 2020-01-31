import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

var config = {
    apiKey: "AIzaSyDEmaXO89GyX6OGD61TUd3QQc6yCPpa8iM",
    authDomain: "myhero-6f85a.firebaseapp.com",
    databaseURL: "https://myhero-6f85a.firebaseio.com",
    projectId: "myhero-6f85a",
    storageBucket: "myhero-6f85a.appspot.com",
    messagingSenderId: "618189625983",
    appId: "1:618189625983:web:c5e38f9a925d69b455fd4a"
};

firebase.initializeApp(config)

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
