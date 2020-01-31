import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import firebase from 'firebase'
import {
    withRouter,
    Redirect
} from 'react-router-dom';

class SignUp extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            photo: '',
            email: '',
            password: '',
            phone: '',
            address: '',
            birthday: '',
            s1: '',
            s2: '',
            s3: '',
        };
    }
    
    handleChange = (field, e) => {
        switch(field) {
            case "photo":
                this.setState({photo: e.target.files[0]});
                break;
            case "email":
                this.setState({email: e.target.value});
                break;
            case "phone":
                this.setState({phone: e.target.value});
                break;
            case "password":
                this.setState({password: e.target.value});
                break;
            case "address":
                this.setState({address: e.target.value});
                break;
            case "birthday":
                this.setState({birthday: e.target.value});
                break;
            case "s1":
                this.setState({s1: e.target.value});
                break;
            case "s2":
                this.setState({s2: e.target.value});
                break;
            case "s3":
                this.setState({s3: e.target.value});
                break;
            default:
                break;
        }
    }

    submitForm = (e) => {
        e.preventDefault();

        let inputs = Object.values(this.state)
        if(inputs.some(item => item === "")) {
            alert("Please fill out all fields")
            return
        } else {

                firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(error => {
                    alert(error.message)
                }).then(cred => {
                    if(cred) {
                        // Get a reference to the storage service, which is used to create references in your storage bucket
                        var storage = firebase.storage();
                        // Create a storage reference from our storage service
                        var storageRef = storage.ref();
                        // Create a child reference
                        let imagesRef = storageRef.child('images/'+this.state.photo.name);
                        let self = this;
                        // Upload image
                        imagesRef.put(this.state.photo).then(snapshot => {
                            snapshot.ref.getDownloadURL().then(function(downloadURL) {
                                var db = firebase.firestore();
                                var userData = self.state;
                                userData.photo = downloadURL
                                db.collection("users").doc(cred.user.uid).set(userData)
                                .then(function() {
                                    // Push to home
                                    self.props.logState();
                                    self.props.history.push('/');
                                })
                                .catch(function(error) {
                                    console.error("Error writing document: ", error);
                                });
                            });
                            
                        });
                    }
                })
        }
        
    }

    render() {

        if(this.props.loggedIn) {
            return <Redirect to='/' />
        } else {
        return (
            <Form className="login-form mainDiv" id="signup-form">
                <h3>Sign up</h3>
                <br></br>
                <Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.Control required type="file" placeholder="Upload an image" onChange={(e) => this.handleChange("photo", e)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required type="email" placeholder="Enter email" onChange={(e) => this.handleChange("email", e)} />
                </Form.Group>
                
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" placeholder="Password" onChange={(e) => this.handleChange("password", e)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control required type="phone" placeholder="Enter phone number" onChange={(e) => this.handleChange("phone", e)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control required type="text" placeholder="Enter address" onChange={(e) => this.handleChange("address", e)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Date of birth</Form.Label>
                    <Form.Control required type="date" placeholder="Enter date of birth" onChange={(e) => this.handleChange("birthday", e)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Security questions</Form.Label>
                    <Form.Control required type="text" placeholder="Mother's name" onChange={(e) => this.handleChange("s1", e)} />
                    <br></br>
                    <Form.Control required type="text" placeholder="Father's name" onChange={(e) => this.handleChange("s2", e)} />
                    <br></br>
                    <Form.Control required type="text" placeholder="Primary school" onChange={(e) => this.handleChange("s3", e)} />
                </Form.Group>
 
                <Button variant="primary" type="submit" onClick={this.submitForm}>
                    Sign up
                </Button>
            </Form>
        );
        }
  }
}

export default withRouter(SignUp)
