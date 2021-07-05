import React, { useState } from "react";
import axios from "axios";
import data from '../data/dummy.json';
import { useSelector, useDispatch } from 'react-redux';
import { setComments } from '../actions/index';


export default function CommentListItem(props) {
  const dispatch = useDispatch();
  const [postInfo, setPostInfo] = useState({})
  const { isSignIn, userId, accessToken, comments } = useSelector(state => state);
  
  // console.log(props)

  const handleLike = () => {
    //버튼 추천 서버 요청
    console.log(props);
    if (!isSignIn) {
      alert('로그인이 필요한 기능이에요')
      return;
    }
    axios
      .patch(process.env.REACT_APP_API_ENDPOINT + '/posts/' + props.postId + '/comments/' + props.commentId, {})
      .then(res => console.log(res))
      .catch(e => {
        if (e.response && (e.response.status === 404 || e.response.status === 409)) alert(e.response.data);
      });
  }

  const handleOpenPost = (postId) => {//파라미터부분에 포스트아이디를받음
    axios
      .get(process.env.REACT_APP_API_ENDPOINT + '/posts/' + postId)
      .catch((e) => console.log(e))
      .then(res => {
        // console.log(res.data)
        props.setPostInfo({
          userId: res.data.userId,
          postId: postId,
          title: res.data.title,
          image: res.data.image,
          content: res.data.content,
          isOpen: res.data.isOpen,
          sara: res.data.sara,
          mara: res.data.mara,
          comment: res.data.comment,
          saraRate: (data.posts.sara / (data.posts.sara + data.posts.mara) * 100) + '%',
          maraRate: (data.posts.sara / (data.posts.sara + data.posts.mara) * 100) + '%',
        })
      })
      .then(res => props.setOpenPost(true))
  }

  const deleteComment = () => {
    if (confirm('사라마라를 삭제할까요?')) {
      axios
        .delete(process.env.REACT_APP_API_ENDPOINT + '/posts/' + props.postId + '/comments/' + props.commentId,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          })
        .then(res => {
          if (window.location.pathname === `/users/${userId}`) {
            const coms = comments.slice();
            coms.splice(coms.indexOf(props.commentId), 1);
            dispatch(setComments(coms));
          }
        })
        .catch((e) => console.log(e))
    } else {
      return;
    }
  }
  // console.log(props.userId === userId)
  // console.log(userId)
  return (
    <div className={'comment-item'}>
      <div className={'comment-item-content'}>{props.content}</div>
      {props.userId === userId || !props.isOpen ?
        null : <button onClick={handleLike}>추천</button>
      }
      <div>{props.like}</div>
      {props.isInMyComment ? 
        <button onClick={() => { handleOpenPost(props.postId) }}>게시물 보기</button> : null
      }
      {props.userId === userId ?
        <button onClick={deleteComment}>X</button> : null
      }
    </div>
  )
}
