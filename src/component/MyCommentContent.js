import React, { useEffect, useState } from "react";
import CommentListItem from "./CommentListItem";
import PostCase from "./PostCase";
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import Nothing from './Nothing';
import { setAlertOpen } from '../actions/index';

export default function MyCommentContent(props) {
  const dispatch = useDispatch();
  const [isOpenPost, setOpenPost] = useState(false);
  const [postInfo, setPostInfo] = useState({});
  const [isInMyComment, setInMyComment] = useState(true);
  const { comments } = useSelector(state => state);
  const { accessToken } = useSelector(state => state);
  const [checkedItems, setChecktedItems] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false)
  const [commentList, setCommentList] = useState(props.displayData)

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
    document.querySelectorAll('.checkbox-one').forEach(checkbox => {
      if (checkbox.checked) checkbox.click();
    })
  }, [commentList])

  const checkedItemHandler = (value, isChecked) => {
    const commentInfo = {
      commentId: value.split(',')[0],
      postId: value.split(',')[1]
    }
    if (isChecked) {
      setChecktedItems([...checkedItems, commentInfo])
    }
    else if (!isChecked) {
      setChecktedItems(pre =>
        pre.filter((el) =>
          el.commentId !== value.split(',')[0]
        ))
    }
  }

  const allCheckedHandler = (isChecked) => {
    if (isChecked.target.checked) {
      setChecktedItems([])
      setChecktedItems(props.displayData.map((el) => {
        return {
          commentId: el.commentId,
          postId: el.postId
        }
      }))
      setIsAllChecked(true)
    }
    else {
      setChecktedItems([])
      setIsAllChecked(false)
    }
  }

  const deleteComment = async () => {
    if (confirm('사라마라를 삭제할까요?')) {
      await checkedItems.forEach((el) => {
        axios
          .delete(process.env.REACT_APP_API_ENDPOINT + '/posts/' + el.postId + '/comments/' + el.commentId,
            {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            }
          )
          .then((res) => {
          setCommentList(res.data.userComments)
          })
          .then(() => {
            setChecktedItems([])
            setIsAllChecked(false)
          })
          .catch(e => refreshtoken(e))
      })
    } else {
      return;
    }
  }

  if (!isOpenPost) {
    if (!commentList.length) {
      return <Nothing whatIsDisplayed={props.whatIsDisplayed}></Nothing>;
    } else {
      return (
        <div id='mp-comments'>
          <div className='check-all'>
            <input id='checkbox-all' type='checkbox' checked={isAllChecked} onChange={(e) => allCheckedHandler(e)}></input>
            <button onClick={deleteComment}>체크된 댓글 삭제</button>
            <div>댓글을 클릭하면 포스트로 이동합니다</div>
          </div>
          {commentList.map((el,idx) => {
            if (comments.includes(el.commentId)) {
              return (
                <CommentListItem
                  key={idx}
                  commentId={el.commentId}
                  userId={el.userId}
                  postId={el.postId}
                  isInMyComment={isInMyComment}
                  setOpenPost={setOpenPost}
                  setPostInfo={setPostInfo}
                  type={el.type}
                  content={el.content}
                  like={el.like}
                  isDisplayCommentModal={props.isDisplayCommentModal}
                  setDisplayCommentModal={props.setDisplayCommentModal}
                  isOpen={props.isOpen}
                  checkedItemHandler={checkedItemHandler}
                  isAllChecked={isAllChecked}
                ></CommentListItem>
              )
            }
          })}
        </div>
      )
    }
  } else {
    return (
      <div id='mp-comments-post'>
        <div id='to-comments' onClick={() => { setOpenPost(false) }}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span> 내 댓글 목록으로 돌아가기</span>
        </div>
        <PostCase
          sara={postInfo.sara}
          setOpenPost={setOpenPost}
          mara={postInfo.mara}
          postId={postInfo.postId}
          userId={postInfo.userId}
          title={postInfo.title}
          image={postInfo.image}
          content={postInfo.content}
          isOpen={postInfo.isOpen}
          comment={postInfo.comment}
        ></PostCase>
      </div>
    )
  }
}
