import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setReplied, setAlertOpen } from '../actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
require("dotenv").config();


export default function WriteModal({ postId, saraMara, isCommentModalOpen, setCommentModalOpen, setSara, setMara, setCommentList }) {
  const dispatch = useDispatch();
  const { userId } = useSelector(state => state);

  const handleComment = async (event) => {
    const comment = event.target.previousElementSibling.value;
    await axios
      .post(process.env.REACT_APP_API_ENDPOINT + '/posts/' + postId + '/comments',
        {
          userId: userId,
          type: saraMara,
          content: comment
        }
      )
      .then(res => {
        setSara(res.data.sara)
        setMara(res.data.mara)
        setCommentList(res.data.comments)
      })
      .then(() => setCommentModalOpen(false))
      .then(() => dispatch(setReplied([postId])))
      .catch(e => {
        if (e.response && (e.response.status === 404 || e.response.status === 409)) {
          dispatch(setAlertOpen(true, e.response.data))
        }
      });
  }

  return (
    <div className={isCommentModalOpen ? 'open-write-comment-modal write-comment-modal' : 'write-comment-modal'}>
      <section className={`write-${saraMara}-comment`}>
        <header>
          <FontAwesomeIcon icon={faTimes} onClick={() => { setCommentModalOpen(false) }} />
          <div>내용 없이 사라마라를 보내려면 지금 바로 등록 버튼을 눌러주세요!</div>
        </header>
        <main>
          <textarea onFocus={(e) => e.target.value = ''} type={'text'}></textarea>
          <button onClick={(e) => { handleComment(e) }}>등록</button>
        </main>
      </section>
    </div>
  )
}