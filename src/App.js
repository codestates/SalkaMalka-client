/* global gapi */

import './App.css';
import React, { useEffect } from "react";
import WritePage from "./pages/WritePage";
import LandingPage from "./pages/LandingPage";
import MyPage from "./pages/MyPage";
import AboutPage from "./pages/AboutPage";
import GuidePage from "./pages/GuidePage";
import Footer from "./component/Footer";
import {
  Switch,
  BrowserRouter,
  Route,
  Redirect
} from "react-router-dom";
import { useSelector } from 'react-redux';

require("dotenv").config();

export default function App() {
  useEffect(() => {
    window.gapi.load('auth2', function() {
      console.log('gapi loading')
      window.gapi.auth2.init({
        client_id: process.env.REACT_APP_GOOGLE_OAUTH_CODE
      })
      .then(() => console.log('gapi initialized'))
    });
  }, [])

  useEffect(() => {
    if (!window.Kakao.Auth) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_KEY);
    }
  }, [])

  useEffect(() => {
    let scrollPos = 0;
    window.addEventListener('scroll', function() {
      //scroll up -> show nav
      if ((document.body.getBoundingClientRect()).top > scrollPos - 1)
      document.querySelector('.side-bar').style.top = '0';
      //scroll down -> hide nav
      else
      document.querySelector('.side-bar').style.top = '-100px';
      scrollPos = (document.body.getBoundingClientRect()).top;
    });
  }, [])

  useEffect(() => {
    const pathName = window.location.pathname;
    window.scrollTo({
      top: 0,
      left: 0
    })
  , [pathName]})

  const { isSignIn, userId } = useSelector(state => state);
  
  return (
    <BrowserRouter>
      <Switch>
        <Route
            exact path='/'
            render={() => {
              // return <Redirect to='/main?sort=date' />;
              return <GuidePage></GuidePage>
            }
          }
        />
        <Route path='/main' render={() =>
          <LandingPage></LandingPage>} />
        <Route path='/search' render={() =>
          <LandingPage></LandingPage>} />
        <Route exact path='/posts' render={() => isSignIn ? (
          <WritePage></WritePage>
        ) : (
          <Redirect to="/"></Redirect>
        )} />
        <Route path={`/users/${userId}`} render={() => isSignIn ? (
          <MyPage></MyPage>
        ) : (
          <Redirect to="/"></Redirect>
        )} />
        <Route path={'/about'} render={() => 
          <AboutPage></AboutPage>} />
      </Switch>
      <Footer></Footer>
    </BrowserRouter>
  )

}

