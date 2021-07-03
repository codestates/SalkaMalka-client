import React from "react";
import CommentListItem from "./CommentListItem";

export default function CommentList(props) {
  const sara = []
  const mara = []

  props.comment.forEach((el) => {
    if (el.type === 'sara') {
      sara.push(el)
    }
    else if (el.type === 'mara') {
      mara.push(el)
    }
  })


  // console.log(props)
  // console.log(sara)
  // console.log(mara)
  return (
    <div className={'comment-display'}>
      <div className={'like-comment-display'}>
        {sara.map((el) => {
          return (
            <CommentListItem
              key={el._id}
              type={el.type}
              content={el.content}
              like={el.like}
              isDisplayCommentModal={props.isDisplayCommentModal}
              setDisplayCommentModal={props.setDisplayCommentModal}
              postId={props.postId}
              commentId={el._id}
            ></CommentListItem>
          )
        })}
      </div>
      <div className={'dislike-comment-display'}>
        {mara.map((el) => {
          return (
            <CommentListItem
              key={el._id}
              type={el.type}
              content={el.content}
              like={el.like}
              isDisplayCommentModal={props.isDisplayCommentModal}
              setDisplayCommentModal={props.setDisplayCommentModal}
              postId={props.postId}
              commentId={el._id}
            ></CommentListItem>
          )
        })}

      </div>
    </div>
  )
}
