import React from "react";
import firebase from 'firebase';
import Button from 'react-bootstrap/Button';
import {
Link,
} from "react-router-dom";

export default class Login extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            user: firebase.auth().currentUser,
            userData: {},
        };
    }

    addUserData = (x) => {
        this.setState({userData: x});
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
                <div style={{marginTop: '10vh', marginBottom: '10vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} className="mainDiv">
                    <img alt="profile_image" src={this.state.userData.photo} style={{height: '200px'}}></img>
                    <br></br>
                    <span>Email: {this.state.userData.email}</span>
                    <span>Address: {this.state.userData.address}</span>
                    <span>Date of birth: {this.state.userData.birthday}</span>
                    <span>Phone: {this.state.userData.phone}</span>
                    <span>Mother's name: {this.state.userData.s1}</span>
                    <span>Father's name: {this.state.userData.s2}</span>
                    <span>Primary school: {this.state.userData.s3}</span>
                </div>
            );
        } else {
            return (
                <div style={{marginTop: '30vh'}} className="mainDiv">
                    <h1 style={{textAlign: 'center', marginBottom: '20px'}}>Welcome to MyHero</h1>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Button variant="primary" style={{ marginRight: '10px' }}>
                            <Link to="/login" style={{ color: '#ffffff', textDecoration: 'none' }}>Log in</Link>
                        </Button>
                        <Button variant="secondary" style={{ marginLeft: '10px' }}>
                            <Link to="/signup" style={{ color: '#ffffff', textDecoration: 'none' }}>Sign up</Link>
                        </Button>
                    </div>
                </div>
            );
        };
    }
}
