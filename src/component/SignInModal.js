import React, { useState, useEffect } from "react";
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { userSignIn, setReplied, setAlertOpen } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faArrowLeft, faArrowRight, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

require("dotenv").config();

export default function SignInModal(props) {
  const dispatch = useDispatch();
  const [sectionType, setSectionType] = useState('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[a-zA-Z]+\.[a-zA-Z]+$/i;
  const passwordRegex = /^[0-9a-zA-Z].{7,32}/i;
  const [matchErr, setMatchErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [wrongErr, setWrongErr] = useState('');
  const [allErr, setAllErr] = useState('');

  useEffect(() => {
    const checkEmail = emailRegex.exec(email);
    if (!email.length || checkEmail) {
      setEmailErr('');
    } else {
      setEmailErr('이메일 형식에 맞지 않습니다.');
    }
  }, [email])

  useEffect(() => {
    const checkPW = passwordRegex.exec(password);
    if (checkPW || !password.length) {
      setPasswordErr('');
    } else if (!checkPW) {
      setPasswordErr('8~32자 사이의 영문 혹은 숫자만 허용됩니다.');
    }
  }, [password])

  useEffect(() => {
    if (password === checkPassword) {
      setMatchErr('');
    } else if (password !== checkPassword) {
      setMatchErr('비밀번호가 일치하지 않습니다.');
    }
  }, [password, checkPassword])

  const resetError = () => {
    setMatchErr('');
    setPasswordErr('');
    setEmailErr('');
    setWrongErr('');
    setAllErr('');
  }

  const resetInputs = () => {
    setEmail('');
    setPassword('');
    setCheckPassword('');
  }

  const getRepliedPosts = (userId, accessToken) => {
    axios
      .get(process.env.REACT_APP_API_ENDPOINT + '/users/' + userId + '/comments', {
        headers: {
          Authorization: `bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      })
      .then(res => dispatch(setReplied(res.data.comments.map(i => i.postId))))
      .catch(e => console.log(e))
  }

  const signInHandler = (email, password) => {
    if (!email || !password) {
      setAllErr('이메일과 비밀번호 모두 입력하세요.');
    } else {
      setAllErr('');
      axios
      .post(process.env.REACT_APP_API_ENDPOINT + '/auth/signin',
      {
        email,
        password
      },
      {
        'Content-Type': 'application/json',
        withCredentials: true,
      })
      .then(res => {
        setWrongErr('')
        const data = {
          email: res.data.email,
          userId: res.data.userId,
          accessToken: res.data.accessToken,
          provider: 'local',
          bookmarks: res.data.bookmarks
        }
        dispatch(userSignIn(data));
        props.closeModal();
        getRepliedPosts(data.userId, data.accessToken);
        dispatch(setAlertOpen(true, `${res.data.email}님, 반가워요!`))
      })
      .catch(e => {
        if (e.response && e.response.status === 404) {
          setWrongErr(e.response.data);
        }
      });
    }
  };

  const signUpHandler = () => {
    if (email === '' || password === '' || checkPassword === '') {
      setAllErr('이메일과 비밀번호 모두 입력하세요.');
    } else {
      setAllErr('');
      if (emailErr === ''
      && matchErr === ''
      && passwordErr === '') {
        axios
        .post(process.env.REACT_APP_API_ENDPOINT + '/auth/signup',
        {
          email, password
        })
        .then(res => {
          setSectionType('signIn');
        })
        .catch(e => {
          if (e.response && e.response.status === 409) {
            setAllErr(e.response.data);
          }
        });
      }
    }
  }

  function googleHandler(response) {
    axios
    .post(process.env.REACT_APP_API_ENDPOINT + '/auth/signin/google',
    {},
    {
      headers: {
        Authorization: `Bearer ${response.tokenId}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then(res => {
      const data = {
        email: res.data.email,
        userId: res.data.userId,
        accessToken: res.data.accessToken,
        provider: 'google',
        bookmarks: res.data.bookmarks
      }
      dispatch(userSignIn(data));
      getRepliedPosts(data.userId, data.accessToken);
      props.closeModal();
      dispatch(setAlertOpen(true, `${res.data.email}님, 반가워요!`))
    })
    .catch(e => console.log(e));
  }

  function kakaoLogin() {
    window.Kakao.Auth.loginForm(
      {
        success: (auth) => {
          axios
          .post(process.env.REACT_APP_API_ENDPOINT + '/auth/signin/kakao',
          {},
          {
            headers: {
              Authorization: `Bearer ${auth.access_token}`,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          })
          .then(res => {
            const data = {
              email: res.data.email,
              userId: res.data.userId,
              accessToken: res.data.accessToken,
              provider: 'kakao',
              bookmarks: res.data.bookmarks
            }
            dispatch(userSignIn(data));
            getRepliedPosts(data.userId, data.accessToken);
            props.closeModal();
            dispatch(setAlertOpen(true, `${res.data.email}님, 반가워요!`))
          })
          .catch(e => console.log(e));
        },
        fail: (err) => {console.log(err);}
      }
    )
  }

  const mainContent = (sectionType === 'signIn') ? (
    <div id='signup-modal-main'>
      <div id='input-center'>
        <div id='signup-email'>
          <label htmlFor='email'>이메일</label>
          <input type="text" name='email' onChange={(e) => { setEmail(e.target.value) }}></input>
        </div>
        <div className='error-msg'></div>
        <div id='signup-password'>
          <label htmlFor='password'>비밀번호</label>
          <input type="password" name='password' onChange={(e) => { setPassword(e.target.value) }}></input>
        </div>
      </div>
      <div id='signup-btn'>
        <div className={allErr.length + wrongErr.length ? 'error-msg' : 'error-msg hidden'}>
          <FontAwesomeIcon icon={faExclamationTriangle} />
          {allErr === '' ? wrongErr : allErr}
        </div>
        <div className='btn-center'>
        <button onClick={() => { signInHandler(email, password) }}>로그인</button>
        <GoogleLogin 
            clientId={process.env.REACT_APP_GOOGLE_OAUTH_CODE}
            onSuccess={googleHandler}
            onFailure={(err) => console.log('err', err)}
            cookiePolicy={'single_host_origin'}
            render={renderProps => <button onClick={renderProps.onClick}>구글</button>}
        />
        <button onClick={kakaoLogin}>카카오</button>
      </div>
      </div>
      <div id='change-section' onClick={() => { setSectionType('signUp') }}>
        <span>회원가입할래요 </span>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </div>
  ) : (
    <div id='signup-modal-main'>
      <div id='input-center'>
        <div id='signup-email'>
          <label htmlFor='email'>이메일</label>
          <input type="text" name='email' onChange={(e) => { setEmail(e.target.value) }}></input>
        </div>
        <div className={emailErr.length ? 'error-msg' : 'error-msg hidden'}>
          <FontAwesomeIcon icon={faExclamationTriangle} />
          {emailErr}
        </div>
        <div id='signup-password'>
          <label htmlFor='password'>비밀번호</label>
          <input type="password" name='password' onChange={(e) => { setPassword(e.target.value) }}></input>
        </div>
        <div className={passwordErr.length ? 'error-msg' : 'error-msg hidden'}>
          <FontAwesomeIcon icon={faExclamationTriangle} />
          {passwordErr}
        </div>
        <div id='signup-password-check'>
          <label htmlFor='password-check'>비밀번호 확인</label>
          <input type="password" name='password-check' onChange={(e) => { setCheckPassword(e.target.value) }}></input>
        </div>
        <div className={matchErr.length ? 'error-msg' : 'error-msg hidden'}>
          <FontAwesomeIcon icon={faExclamationTriangle} />
          {matchErr}
        </div>
      </div>
      <div id='signup-btn'>
        <div className={allErr.length ? 'error-msg' : 'error-msg hidden'}>
          <FontAwesomeIcon icon={faExclamationTriangle} />
          {allErr}
        </div>
        <button onClick={() => { signUpHandler(email, password, checkPassword) }}>회원가입</button>
      </div>
      <div id='change-section' onClick={() => { setSectionType('signIn') }}>
        <FontAwesomeIcon icon={faArrowLeft} />
        <span> 로그인하러 갈래요</span>
      </div>
    </div>
  )

  return (
    <div className={props.isModalOpen ? 'open-signup-modal signup-modal' : 'signup-modal'}>
      {props.isModalOpen ? (
        <section className={sectionType}>
          <FontAwesomeIcon icon={faTimes} onClick={() => {
            resetError();
            resetInputs();
            setSectionType('signIn');
            props.closeModal();
          }}/>
          {mainContent}
        </section>
      ) : null}
    </div>
  )
}
