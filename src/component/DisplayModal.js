import React from "react";
import CommentList from "./CommentList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
require("dotenv").config();


export default function DisplayModal({ postId, isDisplayCommentModal, setDisplayCommentModal, isOpen, setCommentList, commentList }) {


  return (
    <div className={isDisplayCommentModal ? 'open-comment-modal comment-modal' : 'comment-modal'}>
      <section>
        <header>
          <FontAwesomeIcon icon={faTimes} onClick={() => { setDisplayCommentModal(false) }} />
          {isOpen ? null : <div className='closed-msg'>닫혀 있는 살까말까에는 사라마라를 보낼 수 없어요.</div>}
        </header>
        <main>
          <CommentList
            isDisplayCommentModal={isDisplayCommentModal}
            setDisplayCommentModal={setDisplayCommentModal}
            comment={commentList}
            postId={postId}
            isOpen={isOpen}
            setCommentList={setCommentList}
          ></CommentList>
        </main>
      </section>
    </div>
  )
}