import './App.css';
import React, { useEffect } from "react";
import WritePage from "./pages/WritePage";
import LandingPage from "./pages/LandingPage";
import MyPage from "./pages/MyPage";
import AboutPage from "./pages/AboutPage";
import GuidePage from "./pages/GuidePage";
import Footer from "./component/Footer";
import Loading from "./component/Loading";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import AlertModal from './component/AlertModal';

require("dotenv").config();

export default function App() {
  const { isSignIn, userId } = useSelector(state => state);
  
  useEffect(() => {
    if (!window.gapi) {
      window.location.reload();

      console.log('no gapi')
    }
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
      if (!document.querySelector('.side-bar')) {
        window.location.reload();
        console.log('no sidebar')
      }
      else {
        if ((document.body.getBoundingClientRect()).top > scrollPos - 1) {
          document.querySelector('.side-bar').style.top = '0';
        }
        //scroll down -> hide nav
        else {
          document.querySelector('.side-bar').style.top = '-100px';
        }
        scrollPos = (document.body.getBoundingClientRect()).top;
      }
    });
  }, [])

  useEffect(() => {
    console.log(window.location.pathname)
      window.scrollTo({
        top: 0,
        left: 0
      })
    }
  , [window.location.pathname])
  
  return (
    <BrowserRouter>
      <AlertModal />
      <Loading />
      <Switch>
        <Route exact path='/' render={() => <GuidePage />} />
        <Route path='/main' render={() => <LandingPage />} />
        <Route path='/search' render={() => <LandingPage />} />
        <Route exact path='/posts' render={() => isSignIn ? <WritePage /> : <Redirect to="/main?sort=date" />} />
        <Route path={`/users/${userId}`} render={() => isSignIn ? <MyPage /> : <Redirect to="/main?sort=date" />} />
        <Route path='/about' render={() => <AboutPage />} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )

}

