import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import firebase from 'firebase';
import {
    withRouter,
    Redirect
  } from 'react-router-dom';

class Login extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    handleChange = (field, e) => {
        switch(field) {
            case "email":
                this.setState({email: e.target.value});
                break;
            case "password":
                this.setState({password: e.target.value});
                break;
            default:
                break;
        }
    }

    submitForm = (e) => {
        e.preventDefault();
        let inputs = Object.values(this.state)
        if(inputs.some(item => item === "")) {
            alert("Please fill out all fields");
            return;
        } else {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(error => {
                alert(error.message)
            }).then(cred => {
                if(cred) {
                    this.props.logState(true);
                    this.props.history.push('/');
                }
            });

        }
        
    }

    render() {
        if(this.props.loggedIn) {
            return <Redirect to='/' />
        } else {
        return (
            <Form className="login-form mainDiv">
                <h3>Login</h3>
                <br></br>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={(e) => this.handleChange("email", e)} required type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e) => this.handleChange("password", e)} required type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={this.submitForm}>
                    Log in
                </Button>
            </Form>
        );
        }
    }
}

export default withRouter(Login)
