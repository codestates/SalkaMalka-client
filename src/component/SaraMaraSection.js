import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setAlertOpen } from '../actions/index';
require("dotenv").config();


export default function SaraMaraSection({ setCommentModalOpen, setSaraMara, postId, isOpen, OP, getRate, getWidth, formatRate }) {
  const { userId, isSignIn, repliedPosts } = useSelector(state => state);
  const dispatch = useDispatch();

  const handleSaraMara = (target) => {
    if (!isSignIn) {
      dispatch(setAlertOpen(true, '로그인이 필요한 기능이에요.'))
      return;
    }
    if (target === 'sara') {
      setSaraMara('sara')
      setCommentModalOpen(true)
    }
    else if (target === 'mara') {
      setSaraMara('mara')
      setCommentModalOpen(true)
    }
  }

  if (repliedPosts.includes(postId) || !isOpen || userId === OP) {
    return (
      <div className={'post-case-likerate'}>
        <div className={'post-case-rate'}>
          <div className={'post-case-sararate'}>{formatRate(getRate('sara')) + '%'}</div>
          <div className={'post-case-sararate'}>{formatRate(getRate('mara')) + '%'}</div>
        </div>
        <div className={'post-case-graph'}>
          <div style={{ width: getWidth(getRate('sara')) }} className={'post-case-saragraph'}></div>
          <div style={{ width: getWidth(getRate('mara')) }} className={'post-case-maragraph'}></div>
        </div>
      </div>
    )
  } else {
    return (
      <div className={'post-case-likeordislike'}>
        <button className={'post-case-likebtn'} name={'sara'} onClick={(e) => { handleSaraMara(e.target.name) }}>Sara!</button>
        <button className={'post-case-dislikebtn'} name={'mara'} onClick={(e) => { handleSaraMara(e.target.name) }}>Mara!</button>
      </div>
    )
  }
}
