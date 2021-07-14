import React from "react";
import CommentListItem from "./CommentListItem";

export default function BestCommentSection({ bestSara, bestMara, type, isOpen, setCommentList, postId }) {
  const bestComments = (type) => {
    if (type === 'sara') return bestSara;
    else return bestMara;
  }

  const sliceBestComment = (content) => {
    if (content.length < 50) return <div className={'comment-item-content'}>{content}</div>;
    return (<div className={'comment-item-content'}>
      {content.slice(0,50)}
      <span>{' ( ... )'}</span>
    </div>)
  }

  return (
    <div className={type === 'sara' ? 'best-like-comment' : 'best-dislike-comment'}>
      {bestComments(type).map((el) => {
        return (
          <CommentListItem
            key={el._id}
            type={el.type}
            content={sliceBestComment(el.content)}
            like={el.like}
            commentId={el._id}
            userId={el.userId}
            isOpen={isOpen}
            setCommentList={setCommentList}
            postId={postId}
          ></CommentListItem>
        )
      })}
    </div>
  )
}