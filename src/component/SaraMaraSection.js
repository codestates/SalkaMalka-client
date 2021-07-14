import React from "react";
import { useSelector } from 'react-redux';
require("dotenv").config();


export default function SaraMaraSection({ setCommentModalOpen, saraMara, setSaraMara, sara, mara, postId, isOpen, OP }) {
  const { userId, isSignIn, repliedPosts } = useSelector(state => state);


  const handleSaraMara = (target) => {
    if (!isSignIn) {
      alert('로그인이 필요한 기능이에요')
      return;
    }
    if (target === 'sara') {
      setSaraMara('sara')
      console.log(saraMara === 'sara')
      setCommentModalOpen(true)
    }
    else if (target === 'mara') {
      setSaraMara('mara')
      console.log(saraMara === 'sara')
      setCommentModalOpen(true)
    }
  }

  const getRate = (type) => {
    if (type === 'sara') return (sara / (sara + mara) * 100);
    else return (mara / (sara + mara) * 100);
  }

  const getWidth = (rate) => {
    if (sara + mara === 0) return '50%';
    else return rate + '%';
  }

  const formatRate = (rate) => {
    if (!isNaN(rate)) {
      return Math.round(rate * 10) / 10;
    }
    return 0;
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
