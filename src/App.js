import './App.css';
import React, { Component } from "react";
import WritePage from "./pages/WritePage";
import LandingPage from "./pages/LandingPage";
import MyPage from "./pages/MyPage";
import {
  Switch,
  BrowserRouter,
  Route,
  Redirect,
  withRouter,
  useHistory,
} from "react-router-dom";
import { useSelector } from 'react-redux';

class App extends Component {

  state = {
    isSignIn: false,
    accessToken: null
  };

  constructor() {
    super()
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.signUp = this.signUp.bind(this);
    // const {isSignIn, accessToken} = useSelector(state => state)
  }


  signIn = (token) => {
    //로그인요청
    this.setState({
      isSignIn: true,
      accessToken: token
    });
  };

  signOut = () => {
    //로그아웃요청
    this.setState({
      isSignIn: false,
      accessToken: null
    });
  };

  signUp = () => {
    console.log('회원가입완료');
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path='/LandingPage' render={() =>
              <LandingPage
                isSignIn={this.state.isSignIn}
                accessToken={this.state.accessToken}
                signIn={this.signIn}
                signOut={this.signOut}
                signUp={this.signUp}
              ></LandingPage>} />
            <Route path='/WritePage' render={() => this.state.isSignIn ? (
              <WritePage
                isSignIn={this.state.isSignIn}
                accessToken={this.state.accessToken}
                signIn={this.signIn}
                signOut={this.signOut}
                signUp={this.signUp}
              ></WritePage>
            ) : (
              <Redirect to="/LandingPage"></Redirect>
            )} />
            <Route path='/MyPage' render={() => this.state.isSignIn ? (
              <MyPage
                isSignIn={this.state.isSignIn}
                accessToken={this.state.accessToken}
                signIn={this.signIn}
                signOut={this.signOut}
                signUp={this.signUp}
              ></MyPage>
            ) : (
              <Redirect to="/LandingPage"></Redirect>
            )} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}


export default App;
