import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Home from "./routes/Home"
import UserProfile from "./routes/UserProfile"
import Login from "./routes/Login"
import SignUp from "./routes/SignUp"
import firebase from 'firebase'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  logState = (x) => {
    this.setState({
      loggedIn: x
    })
  }

  logOut = () => {
    this.logState(false);
    firebase.auth().signOut();
  }

  componentDidMount() {
    var user = firebase.auth().currentUser;
    if (user) {
      this.logState(true);
    } else {
      this.logState(false);
    };
  }

  render() {
    if(this.state.loggedIn) {
      return (
      <Router>
        <div>
        <Navbar bg="dark">
          <Navbar.Brand><Link to="/" style={{color: '#fff', textDecoration: 'none'}}>MyHero</Link></Navbar.Brand>
          <Nav className="ml-auto">
            <Link to="/" style={{color: '#fff', margin: '0 10px', textDecoration: 'none'}}>Home</Link>
            <Link to="/user-profile" style={{color: '#fff', margin: '0 10px', textDecoration: 'none'}}>User profile</Link>
            <Link onClick={this.logOut} to="/login" style={{color: '#fff', margin: '0 10px', textDecoration: 'none'}}>Log out</Link>
          </Nav>
        </Navbar>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login">
              <Login logState={this.logState} />
            </Route>
            <Route path="/user-profile">
              <UserProfile logState={this.logState} />
            </Route>
            <Route path="/">
              <Home logState={this.logState} />
            </Route>
          </Switch>
          <footer style={{width: '100vw', height: '50px', backgroundColor: '#333'}}><span style={{display: 'block', textAlign: 'center', color: '#fff', paddingTop: '15px'}}>MyHero - demo project by Ivan Maurovic</span></footer>
        </div>
      </Router>
    )} else {
      return (
      <Router>
        <div>
        <Navbar bg="dark">
        <Navbar.Brand><Link to="/" style={{color: '#fff', textDecoration: 'none'}}>MyHero</Link></Navbar.Brand>
          <Nav className="ml-auto">
            <Link to="/" style={{color: '#fff', margin: '0 10px', textDecoration: 'none'}}>Home</Link>
            <Link to="/login" style={{color: '#fff', margin: '0 10px', textDecoration: 'none'}}>Log in</Link>
            <Link to="/signup" style={{color: '#fff', margin: '0 10px', textDecoration: 'none'}}>Sign up</Link>
          </Nav>
        </Navbar>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login">
              <Login logState={this.logState} loggedIn={this.state.loggedIn} />
            </Route>
            <Route path="/signup">
              <SignUp logState={this.logState} loggedIn={this.state.loggedIn}  />
            </Route>
            <Route path="/">
              <Home logState={this.logState} />
            </Route>
          </Switch>
          <footer style={{width: '100vw', height: '50px', backgroundColor: '#333'}}><span style={{display: 'block', textAlign: 'center', color: '#fff', paddingTop: '15px'}}>MyHero - demo project by Ivan Maurovic</span></footer>
        </div>
      </Router>
      )
    }
  }
}