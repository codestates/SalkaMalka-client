import React, { useEffect, useState, useRef } from "react";
import SideBar from "../component/SideBar";
import MyBookMarkContent from "../component/MyBookMarkContent";
import MyPostContent from "../component/MyPostContent";
import MyCommentContent from "../component/MyCommentContent";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { useHistory } from "react-router";
import persistor from '../index';
import { setBookmarks, setPosts, setComments, setClosed, setReplied } from '../actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'



export default function MyPage() {

  const hasScroll = useRef()

  const dispatch = useDispatch();
  const history = useHistory();
  const { accessToken, userId, email, provider } = useSelector(state => state);
  const [myPostData, setMyPostData] = useState([])
  const [myCommentData, setMyCommentData] = useState([])
  const [myBookMarkData, setMyBookMarkData] = useState([])
  const [whatIsDisplayed, setWhatIsDisplayed] = useState('Posts')
  const [isScrollOn, setIsScrollOn] = useState(true)



  useEffect(() => {
    console.log('바디스크롤:', document.body.scrollHeight)
    console.log('바디클라:', document.body.clientHeight)
    console.log('바디오프셋:', document.body.offsetHeight)
    console.log('대상:',hasScroll)
    console.log('대상스크롤:', hasScroll.current.scrollHeight)
    console.log('대상클라:', hasScroll.current.clientHeight)
    console.log('대상오프셋:', hasScroll.current.offsetHeight)
    if (document.body.clientHeight < hasScroll.current.clientHeight) {
      setIsScrollOn(true)
    }
    else {
      setIsScrollOn(true)
    }
  })

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_ENDPOINT + '/users/' + userId + '/posts', {
        headers: {
          Authorization: `bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      })
      .then((res) => {
        // console.log(res.data.posts)
        setMyPostData(res.data.posts)
        dispatch(setPosts(res.data.posts.filter(i => i.isOpen).map(i => i._id)));
        dispatch(setClosed(res.data.posts.filter(i => !i.isOpen).map(i => i._id)));
      })
      .catch((e) => console.log(e))
    axios
      .get(process.env.REACT_APP_API_ENDPOINT + '/users/' + userId + '/comments', {
        headers: {
          Authorization: `bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      })
      .then((res) => {
        console.log(res.data.comments.map(i => i.commentId))
        setMyCommentData(res.data.comments)
        dispatch(setComments(res.data.comments.map(i => i.commentId)));
        dispatch(setReplied(res.data.comments.map(i => i.postId)));
      })
      .catch((e) => console.log(e))
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
      })
      .catch((e) => console.log(e))
  }, [])

  const handleCategory = (category) => {
    console.log('category: ', category)
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
        </header>)
      case 'Comments':
        return (<header id='mp-title'>
          <span id='current-page'>{param}</span>
          <span onClick={(e) => { handleCategory(e.target.textContent) }}>Posts</span>
          <span onClick={(e) => { handleCategory(e.target.textContent) }}>Bookmarks</span>
        </header>)
      case 'Bookmarks':
        return (<header id='mp-title'>
          <span id='current-page'>{param}</span>
          <span onClick={(e) => { handleCategory(e.target.textContent) }}>Posts</span>
          <span onClick={(e) => { handleCategory(e.target.textContent) }}>Comments</span>
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
            if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
              gapi.auth2.getAuthInstance().signOut().then(function () {
                console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
              })
              gapi.auth2.getAuthInstance().disconnect();
            }
          }

          // store 초기화
          persistor.purge();
        })
        .then(() => history.push('/'))
        .catch(e => console.log(e));
    }
  }

  const scrollToTop = () => {
    // console.log(window.scrollTo)
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
        <div id='hello-msg'>{`${email}님, 안녕하세요?`}</div>
        <button id='goodbye-btn' onClick={deleteAccount}>탈퇴</button>
        {getHeader(whatIsDisplayed)}
        {renderSwitchParam(whatIsDisplayed)}
        {isScrollOn ? (
          <div className={'lp-up-btn'} onClick={scrollToTop}>
            <FontAwesomeIcon icon={faChevronUp} className='fa-2x' />
          </div>
        ) : null}
      </div>
    </div>
  )
}

// {renderSwitchParam(whatIsDisplayed)}
