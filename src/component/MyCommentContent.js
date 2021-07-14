import React, { useEffect, useState } from "react";
import CommentListItem from "./CommentListItem";
import PostCase from "./PostCase";
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import CommentList from "./CommentList";
import Nothing from './Nothing';

export default function MyCommentContent(props) {
  // console.log(props)
  const [isOpenPost, setOpenPost] = useState(false);
  const [postInfo, setPostInfo] = useState({});
  const [isInMyComment, setInMyComment] = useState(true);
  const { comments } = useSelector(state => state);
  const { accessToken } = useSelector(state => state);
  const [checkedItems, setChecktedItems] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false)
  // console.log(comments)
  const [commentList, setCommentList] = useState(props.displayData)

  useEffect(() => {
    // console.log(commentList)
    document.querySelectorAll('.checkbox-one').forEach(checkbox => {
      if (checkbox.checked) checkbox.click();
    })
  }, [commentList])
  useEffect(() => console.log(checkedItems), [checkedItems])

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
    console.log(isChecked)
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

  // console.log(commentList)

  const deleteComment = async () => {
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
    })
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
