import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import firebase from 'firebase'
import {
Redirect,
withRouter
} from "react-router-dom";

class UserProfile extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            userData: {},
            user: firebase.auth().currentUser,
            address: '',
            photo: '',
            birthday: '',
            phone: '',
            s1: '',
            s2: '',
            s3: '',
        };
    }

    storePhotoURL = (x) => {
        this.setState({photo: x})
    }

    handleChange = (field, e) => {
        switch(field) {
            case "photo":
                this.setState({photo: e.target.files[0]});
                break;
            case "phone":
                this.setState({phone: e.target.value});
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

    addUserData = (x) => {
        this.setState({userData: x, photo: x.photo, phone: x.phone, address: x.address, birthday: x.birthday, s1: x.s1, s2: x.s2, s3: x.s3});
    }

    submitForm = (e) => {
        e.preventDefault();
        var self = this;
        
        var db = firebase.firestore();
        var userData = this.state.userData;
        userData.phone = this.state.phone;
        userData.address = this.state.address;
        userData.birthday = this.state.birthday;
        userData.s1 = this.state.s1;
        userData.s2 = this.state.s2;
        userData.s3 = this.state.s3;

        if(this.state.photo) {
            var storage = firebase.storage();
            // Create a storage reference from our storage service
            var storageRef = storage.ref();
            // Create a child reference
            let imagesRef = storageRef.child('images/'+this.state.photo.name);
            // Upload image
            imagesRef.put(this.state.photo).then(snapshot => {
                snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    userData.photo = downloadURL
                    db.collection("users").doc(self.state.user.uid).set(userData)
                    .then(function() {
                        self.props.history.push('/');
                    })
                });
            });
            
        } else {
            db.collection("users").doc(self.state.user.uid).set(userData)
            .then(function() {
                self.props.history.push('/');
            })
        }

        
    }

    componentDidMount() {
        this.setState({user: firebase.auth().currentUser})
        if(this.state.user) {
            this.props.logState(true);
            let self = this
            var db = firebase.firestore();
            db.collection("users").doc(this.state.user.uid).get().then(doc => {
                self.addUserData(doc.data())
            });
        }
      }

    render() {
        
        if (this.state.user) {
            return (
                <Form className="login-form" id="signup-form">
                    <h3>Edit user profile</h3>
                    <br></br>

                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" placeholder="Upload an image" onChange={(e) => this.handleChange("photo", e)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control type="phone" placeholder="Enter phone number" value={this.state.phone} onChange={(e) => this.handleChange("phone", e)} />
                    </Form.Group>
    
                    <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter address" value={this.state.address} onChange={(e) => this.handleChange("address", e)} />
                    </Form.Group>
    
                    <Form.Group>
                        <Form.Label>Date of birth</Form.Label>
                        <Form.Control type="date" placeholder="Enter date of birth" value={this.state.birthday} onChange={(e) => this.handleChange("birthday", e)} />
                    </Form.Group>
    
                    <Form.Group>
                        <Form.Label>Security questions</Form.Label>
                        <Form.Control type="text" placeholder="Mother's name" value={this.state.s1} onChange={(e) => this.handleChange("s1", e)} />
                        <br></br>
                        <Form.Control type="text" placeholder="Father's name" value={this.state.s2} onChange={(e) => this.handleChange("s2", e)} />
                        <br></br>
                        <Form.Control type="text" placeholder="Primary school" value={this.state.s3} onChange={(e) => this.handleChange("s3", e)} />
                    </Form.Group>
     
                    <Button variant="primary" type="submit" onClick={this.submitForm}>
                        Save
                    </Button>
                </Form>
            );
        } else {
            return <Redirect to='/' />
        }
    }
}
export default withRouter(UserProfile)
