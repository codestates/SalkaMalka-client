import React from "react";
import CommentListItem from "./CommentListItem";

export default function CommentList(props) {
  const sara = props.comment.filter(i => i.type === 'sara');
  const mara = props.comment.filter(i => i.type === 'mara');

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
              userId={el.userId}
              isOpen={props.isOpen}
              setCommentList={props.setCommentList}
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
              userId={el.userId}
              isOpen={props.isOpen}
              setCommentList={props.setCommentList}
            ></CommentListItem>
          )
        })}

      </div>
    </div>
  )
}
