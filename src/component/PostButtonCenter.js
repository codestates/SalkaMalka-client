import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faBookmark as farfaBookmark } from '@fortawesome/free-regular-svg-icons'
import { faBookmark as fasfaBookmark } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux';
import { setBookmarks, setPosts, setClosed, setAccessToken } from '../actions/index';
import { useHistory } from "react-router";
import axios from 'axios';

export default function PostButtonCenter(props) {
  const pathName = window.location.pathname;
  const history = useHistory();
  const dispatch = useDispatch();
  const { userId, bookmarks, isSignIn, accessToken } = useSelector(state => state);
  
  const refreshtoken = (e) => {
    if (e.response && e.response.status === 401) {
      alert('토큰이 만료되어 재발급해 드릴게요.');
      axios
      .post(process.env.REACT_APP_API_ENDPOINT + '/auth/refreshtoken', {}, {
        withCredentials: true,
      })
      .then(res => dispatch(setAccessToken(res.data.accessToken)))
      .then(() => alert('새로운 토큰을 발급받았어요. 다시 시도해 주세요.'))
      .catch(e => console.log(e));
    }
  }

  const handlePostDelete = () => {
    if (confirm('살까말까를 삭제하면 더이상 사라마라를 받을 수 없어요')) {
      axios
        .delete(process.env.REACT_APP_API_ENDPOINT + '/posts/' + props.postId,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        )
        .then(res => {
          if (pathName === '/search' || pathName === '/main') {
            history.push('/');
          }
          else if (pathName === `/users/${userId}`) {
            if (props.isOpen) {
              const ps = openPosts.slice();
              ps.splice(ps.indexOf(props.postId), 1);
              dispatch(setPosts(ps));
            } else {
              const ps = closedPosts.slice();
              ps.splice(ps.indexOf(props.postId), 1);
              dispatch(setClosed(ps));
            }
          }
        })
        .catch(e => refreshtoken(e));
    } else {
      return;
    }
  }

  const handlePostClose = () => {
    if (confirm('살까말까를 닫으면 더이상 사라마라를 받을 수 없어요')) {
      axios
        .patch(process.env.REACT_APP_API_ENDPOINT + '/posts/' + props.postId, {},
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        )
        .then(res => {
          if (pathName === '/search' || pathName === '/main') {
            history.push('/');
          } else if (pathName === `/users/${userId}`) {
            const ps = openPosts.slice();
            ps.splice(ps.indexOf(props.postId), 1);
            dispatch(setPosts(ps));
            dispatch(setClosed([...closedPosts, props.postId]));
            window.location.reload(false);
          }
        })
        .catch(e => refreshtoken(e));
    } else {
      return;
    }
  }

  const handleBookmark = () => {
    if (!isSignIn) {
      alert('로그인이 필요한 기능이에요');
      return;
    }
    axios
      .post(process.env.REACT_APP_API_ENDPOINT + '/users/' + userId + '/bookmarks',
        {
          postId: props.postId
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then(res => {
        alert(res.data);
        dispatch(setBookmarks([...bookmarks, props.postId]));
      })
      .catch(e => refreshtoken(e));
  }

  const handleUnBookmark = () => {
    axios
      .delete(process.env.REACT_APP_API_ENDPOINT + '/users/' + userId + '/bookmarks/' + props.postId,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then(res => {
        alert(res.data);
        const bms = bookmarks.slice();
        bms.splice(bms.indexOf(props.postId), 1);
        dispatch(setBookmarks(bms));
      })
      .catch(e => refreshtoken(e));
  }

  if (userId === props.userId) { // 내 글: 닫기+삭제 or 삭제
    if (props.isOpen) {
      return (<div className='post-btn-center'>
        <button onClick={handlePostClose}>닫기</button>
        <FontAwesomeIcon icon={faTrashAlt} onClick={handlePostDelete} />
      </div>)
    } else {
      return (<div className='post-btn-center'>
        <FontAwesomeIcon icon={faTrashAlt} onClick={handlePostDelete} />
      </div>)
    }
  }
  else if (bookmarks.includes(props.postId)) { // 남의 글: 북마크 or 북마크 해제
    return (<div className='post-btn-center'>
      <FontAwesomeIcon icon={fasfaBookmark} onClick={handleUnBookmark} />
    </div>)
  }
  else {
    return (<div className='post-btn-center'>
      <FontAwesomeIcon icon={farfaBookmark} onClick={handleBookmark} />
    </div>)
  }
}
