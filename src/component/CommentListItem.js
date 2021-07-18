import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { setAlertOpen } from '../actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faTrashAlt } from '@fortawesome/free-regular-svg-icons'

export default function CommentListItem(props) {
  const dispatch = useDispatch();
  const { isSignIn, userId, accessToken, king } = useSelector(state => state);
  const [likeInfo, setLikeInfo] = useState(props.like.length)
  const [bChecked, setChecked] = useState(false)
  const allCheckHandler = () => setChecked(props.isAllChecked)
  const isKing = props.userId === king ? true : false

  useEffect(() => allCheckHandler(), [props.isAllChecked])
  
  const checkedHandler = ({ target }) => {
    setChecked(!bChecked)
    props.checkedItemHandler(target.value, target.checked)
  }

  useEffect(() => {
    if (!props.isInMyComment) {
      let comment = props.commentList.filter(el => el._id === props.commentId)[0]
      if (comment) setLikeInfo(comment.like.length);
    }
  }, [props.commentList])

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

  const handleLike = () => {
    if (!isSignIn) {
      dispatch(setAlertOpen(true, '로그인이 필요한 기능이에요.'))
      return;
    }
    axios
      .patch(process.env.REACT_APP_API_ENDPOINT + '/posts/' + props.postId + '/comments/' + props.commentId, {
        userId: userId
      })
      .then(res => {
        let comments = props.commentList.map(el => {
          if (el._id === props.commentId) {
            return {...el, like: res.data.like}
          } else {
            return el;
          }
        })
        props.setCommentList(comments);
      })
      .catch(e => {
        if (e.response && (e.response.status === 404 || e.response.status === 409 || e.response.status === 400)) dispatch(setAlertOpen(true, e.response.data));
      });
  }

  const handleOpenPost = (postId) => {//파라미터부분에 포스트아이디를받음
    axios
      .get(process.env.REACT_APP_API_ENDPOINT + '/posts/' + postId)
      .then(res => {
        props.setPostInfo({
          userId: res.data.userId._id,
          postId: postId,
          title: res.data.title,
          image: res.data.image,
          content: res.data.content,
          isOpen: res.data.isOpen,
          sara: res.data.sara,
          mara: res.data.mara,
          comment: res.data.comment,
          saraRate: (res.data.sara / (res.data.sara + res.data.mara) * 100) + '%',
          maraRate: (res.data.sara / (res.data.sara + res.data.mara) * 100) + '%',
        })
      })
      .then(res => props.setOpenPost(true))
      .catch((e) => console.log(e))
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
          props.setCommentList(res.data.comments);
        })
        .catch((e) => refreshtoken(e))
    } else {
      return;
    }
  }

  return (
    <div className={props.type === 'sara' ? 'comment-item sara' : 'comment-item mara'}>
      {!props.checkedItemHandler ? null : (
        <input
          className='checkbox-one'
          type='checkbox'
          checked={bChecked}
          value={[props.commentId,
          props.postId]}
          onChange={(e) => checkedHandler(e)}
        />
      )}
      <div className={isKing ? 'comment-item-content king' : 'comment-item-content'} onClick={() => {
        if (props.isInMyComment) handleOpenPost(props.postId);
      }}>{props.content}</div>
      <div className='comment-item-btn-center'>
        {props.isCloseState? <div>답변으로 선택하기</div> : <div className='comment-item-like-count'>{likeInfo}</div>}
        {props.userId === userId && props.isOpen && !props.isCloseState ?
          <FontAwesomeIcon icon={faTrashAlt} onClick={deleteComment} /> : null
        }
        {props.userId !== userId && props.isOpen && !props.isCloseState ?
          <FontAwesomeIcon icon={faThumbsUp} onClick={handleLike} /> : null
        }
        {!props.isCloseState ? null : (
          <input 
            type='radio'
            value={props.commentId}
            onChange={(e) => {props.setChosenComment(e.target.value)}}
          />
        )}
      </div>
    </div>
  )
}
