import React from "react";
import CommentListItem from "./CommentListItem";

export default function BestCommentSection({ bestSara, bestMara, type, isOpen, commentList, setCommentList, postId, OP }) {
  const bestComments = (type) => {
    if (type === 'sara') return bestSara;
    else return bestMara;
  }
  const sliceBestComment = (content) => {
    if (content.length < 50) return content;
    return (content.slice(0,50) + ' ( ... )')
  }

  const handleUserId = (el) => {
    if (el.userId && typeof el.userId === 'object') {
      return el.userId._id;
    } else {
      return el.userId;
    }
  }

  return (
    <div className={type === 'sara' ? 'best-like-comment' : 'best-dislike-comment'}>
      {bestComments(type).map((el,idx) => {
        return (
          <CommentListItem
            key={idx}
            type={el.type}
            content={sliceBestComment(el.content)}
            like={el.like}
            commentId={el._id}
            userId={handleUserId(el)}
            isOpen={isOpen}
            commentList={commentList}
            setCommentList={setCommentList}
            postId={postId}
            OP={OP}
          ></CommentListItem>
        )
      })}
    </div>
  )
}