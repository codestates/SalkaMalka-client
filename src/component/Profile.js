import React, { useState } from "react";
import { useHistory } from "react-router";
import SignInModal from './SignInModal.js'
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import persistor from '../index';
import { setAccessToken, setGuideOpen, setAlertOpen } from '../actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
require("dotenv").config();

export default function Profile() {
  const pathName = window.location.pathname;
  const history = useHistory();
  const dispatch = useDispatch();
  const [isModalOpen, modalOpenset] = useState(false);
  const { isSignIn, accessToken, provider, userId } = useSelector(state => state);

  const openModal = () => {
    modalOpenset(true);
  }
  const closeModal = () => {
    modalOpenset(false);
  }

  const refreshtoken = (e) => {
    if (e.response && e.response.status === 401) {
      dispatch(setAlertOpen(true, '토큰이 만료되어 재발급해 드릴게요.'))
      axios
        .post(process.env.REACT_APP_API_ENDPOINT + '/auth/refreshtoken', {}, {
          withCredentials: true,
        })
        .then(res => dispatch(setAccessToken(res.data.accessToken)))
        .then(() => { dispatch(setAlertOpen(true, '새로운 토큰을 발급받았어요. 다시 시도해 주세요.')) })
        .catch(e => console.log(e));
    }
  }

  const handleSocialSignout = () => {
    // 카카오 로그인이 되어있는 경우
    if (provider === 'kakao') {
      if (window.Kakao.Auth.getAccessToken() !== null) {
        window.Kakao.Auth.logout(function () {
          console.log(window.Kakao.Auth.getAccessToken());
        })
      }
    }

    // 구글 로그인이 되어있는 경우
    else if (provider === 'google') {
      if (gapi.auth2) {
        if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
          gapi.auth2.getAuthInstance().signOut()
            .then(() => {
              console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
            })
            .catch(e => console.log(e))
          gapi.auth2.getAuthInstance().disconnect();
        }
      }
    }
  }

  const handleSignout = () => {
    axios
      .post(process.env.REACT_APP_API_ENDPOINT + '/auth/signout', {}, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then(res => {
        handleSocialSignout();
      })
      .then(() => persistor.purge())
      .then(() => history.push('/'))
      .catch(e => refreshtoken(e));
  }

  if (pathName === '/') {
    return (
      <button id='skip-btn' onClick={() => {
        history.push('/main?sort=date')
        if (window.innerWidth > 720) dispatch(setGuideOpen(true));
      }}>skip
      <FontAwesomeIcon icon={faArrowRight} />
      </button>
    )
  }
  else if (isSignIn) {
    return (
      <div className='profile'>
        <div>

        <div id='to-guide-modal' onClick={() => { dispatch(setGuideOpen(true)) }}>Guide</div>
        <div id='to-about-page' onClick={() => { history.push('/about') }}>About</div>
        </div>
        <FontAwesomeIcon id='menu' icon={faBars} />
        <div className={'menu-open'}>
          <div onClick={() => history.push('/posts')}>Write</div>
          <div onClick={() => history.push(`/users/${userId}`)}>My Page</div>
          <div onClick={handleSignout}>Log Out</div>
        </div>
        <SignInModal
          isModalOpen={isModalOpen}
          openModal={openModal}
          closeModal={closeModal}
        ></SignInModal>
      </div>
    )
  }
  else {
    return (
      <div className='profile'>
        <div id='to-guide-modal' onClick={() => { dispatch(setGuideOpen(true)) }}>Guide</div>
        <div id='to-about-page' onClick={() => { history.push('/about') }}>About</div>
        <div id='to-signup-modal' onClick={openModal}>Log In</div>
        <SignInModal
          isModalOpen={isModalOpen}
          openModal={openModal}
          closeModal={closeModal}
        ></SignInModal>
      </div>
    )
  }
}
