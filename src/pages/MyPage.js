import React, { useEffect, useState, useRef } from "react";
import SideBar from "../component/SideBar";
import MyBookMarkContent from "../component/MyBookMarkContent";
import MyPostContent from "../component/MyPostContent";
import MyCommentContent from "../component/MyCommentContent";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { useHistory } from "react-router";
import persistor from '../index';
import { setBookmarks, setPosts, setComments, setClosed, setReplied, setAccessToken } from '../actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { setLoading, setAlertOpen } from '../actions/index';


export default function MyPage() {
  const hasScroll = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const { accessToken, userId, provider } = useSelector(state => state);
  const [myPostData, setMyPostData] = useState([])
  const [myCommentData, setMyCommentData] = useState([])
  const [myBookMarkData, setMyBookMarkData] = useState([])
  const [whatIsDisplayed, setWhatIsDisplayed] = useState('Posts')
  const [isScrollOn, setIsScrollOn] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  const logit = () => {
    setScrollY(window.pageYOffset)
  }

  useEffect(() => {
    const watchScroll = () => {
      window.addEventListener('scroll', logit)
      if (scrollY > 0) {
        setIsScrollOn(true)
      }
      else {
        setIsScrollOn(false)
      }
    }
    watchScroll()
    return () => {
      window.removeEventListener('scroll', logit)
    }
  })


  function detectMob() {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
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

  useEffect(() => {
    dispatch(setLoading(true))
    axios
      .get(process.env.REACT_APP_API_ENDPOINT + '/users/' + userId + '/posts', {
        headers: {
          Authorization: `bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      })
      .then((res) => {
        setMyPostData(res.data.posts)
        dispatch(setPosts(res.data.posts.filter(i => i.isOpen).map(i => i._id)));
        dispatch(setClosed(res.data.posts.filter(i => !i.isOpen).map(i => i._id)));
        dispatch(setLoading(false))
      })
      .catch((e) => refreshtoken(e))
    axios
      .get(process.env.REACT_APP_API_ENDPOINT + '/users/' + userId + '/comments', {
        headers: {
          Authorization: `bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      })
      .then((res) => {
        setMyCommentData(res.data.comments)
        dispatch(setComments(res.data.comments.map(i => i.commentId)));
        dispatch(setReplied(res.data.comments.map(i => i.postId)));
        dispatch(setLoading(false))
      })
      .catch((e) => refreshtoken(e))
    axios
      .get(process.env.REACT_APP_API_ENDPOINT + '/users/' + userId + '/bookmarks', {
        headers: {
          Authorization: `bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      })
      .then((res) => {
        setMyBookMarkData(res.data.bookmarks);
        dispatch(setBookmarks(res.data.bookmarks.map(i => i._id)));
        dispatch(setLoading(false))
      })
      .catch((e) => refreshtoken(e))
  }, [])

  const handleCategory = (category) => {
    switch (category) {
      case 'Posts':
        setWhatIsDisplayed(category)
        break;
      case 'Comments':
        setWhatIsDisplayed(category)
        break;
      case 'Bookmarks':
        setWhatIsDisplayed(category)
        break;
      default:
        break;
    }
  }

  const renderSwitchParam = (param) => {
    switch (param) {
      case 'Posts':
        return (<MyPostContent whatIsDisplayed={whatIsDisplayed} displayData={myPostData}></MyPostContent>)
      case 'Comments':
        return (<MyCommentContent whatIsDisplayed={whatIsDisplayed} displayData={myCommentData}></MyCommentContent>)
      case 'Bookmarks':
        return (<MyBookMarkContent whatIsDisplayed={whatIsDisplayed} displayData={myBookMarkData}></MyBookMarkContent>)
      default:
        break;
    }
  }

  const getHeader = (param) => {
    switch (param) {
      case 'Posts':
        return (<header id='mp-title'>
          <span id='current-page'>{param}</span>
          <span onClick={(e) => { handleCategory(e.target.textContent) }}>Comments</span>
          <span onClick={(e) => { handleCategory(e.target.textContent) }}>Bookmarks</span>
          <div><button id='goodbye-btn' onClick={deleteAccount}>탈퇴</button></div>
        </header>)
      case 'Comments':
        return (<header id='mp-title'>
          <span id='current-page'>{param}</span>
          <span onClick={(e) => { handleCategory(e.target.textContent) }}>Posts</span>
          <span onClick={(e) => { handleCategory(e.target.textContent) }}>Bookmarks</span>
          <div><button id='goodbye-btn' onClick={deleteAccount}>탈퇴</button></div>
        </header>)
      case 'Bookmarks':
        return (<header id='mp-title'>
          <span id='current-page'>{param}</span>
          <span onClick={(e) => { handleCategory(e.target.textContent) }}>Posts</span>
          <span onClick={(e) => { handleCategory(e.target.textContent) }}>Comments</span>
          <div><button id='goodbye-btn' onClick={deleteAccount}>탈퇴</button></div>
        </header>)
      default:
        break;
    }
  }

  const deleteAccount = () => {
    if (confirm('정말로 탈퇴하시겠어요?')) {
      axios
        .delete(process.env.REACT_APP_API_ENDPOINT + '/users/' + userId, {
          headers: {
            Authorization: `bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        })
        .then(res => {
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
        })
        .then(() => persistor.purge())
        .then(() => history.push('/'))
        .catch(e => refreshtoken(e));
    } else {
      return;
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className={'my-page'} >
      <SideBar
        whatIsDisplayed={whatIsDisplayed}
        handleCategory={handleCategory}
      ></SideBar>
      <div className={'mp-content'} ref={hasScroll}>
        {getHeader(whatIsDisplayed)}
        {renderSwitchParam(whatIsDisplayed)}
      </div>
      {isScrollOn ? (
        <div className={'lp-up-btn'} onClick={scrollToTop}>
          <FontAwesomeIcon icon={faChevronUp} className='fa-2x' />
        </div>
      ) : null}
    </div>
  )
}

// {renderSwitchParam(whatIsDisplayed)}
