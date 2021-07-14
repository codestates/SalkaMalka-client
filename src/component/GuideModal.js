import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faTrashAlt, faBookmark as farfaBookmark } from '@fortawesome/free-regular-svg-icons'
import { faTimes, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import SamplePost1 from "../logo/SamplePost1.png";
import { setGuideOpen } from '../actions/index';
require("dotenv").config();


export default function SamplePost() {
  const dispatch = useDispatch();
  const { isGuideOpen } = useSelector(state => state);
  console.log(isGuideOpen);
  function handleImageURL(image) {
    if (image) {
      return (<img src={`${process.env.REACT_APP_API_ENDPOINT}/${image}`}></img>)
    }
    else return (<img src='' alt='placeholder'></img>)
  }

  const samplePost = {
    title: '제목',
    content: '내용'
  }

  const sampleComments = [
    '사라 1',
    '사라 2',
    '사라 3',
    '마라 1',
    '마라 2',
    '마라 3'
  ]

  const getClassName = (isGuideOpen) => {
    if (isGuideOpen) return 'sample-post-modal';
    else return 'sample-post-modal display-none';
  }


  console.log(getClassName(isGuideOpen))
  return (
    <div className={getClassName(isGuideOpen)}>
    <main>
      <FontAwesomeIcon icon={faTimes} onClick={() => {
        dispatch(setGuideOpen(false));
      }}/>
      <div>살까말까 사용설명서</div>
      <img id='sample-post' src={SamplePost1}></img>
    </main>
    </div>
    
  )
  return (<div id='sample-post'>
    <div className={'post-case'}>
      <div className={'post-case-header'}>
        <div className={'post-case-title'}>{samplePost.title}</div>
        <div className='post-btn-center'>
            <button>닫기</button>
            <FontAwesomeIcon icon={faTrashAlt} />
            <FontAwesomeIcon icon={farfaBookmark} />
        </div>
      </div>
      <div className={'post-case-body'}>
        <div className={'post-case-img-box'}>{handleImageURL()}</div>
        <div className={'post-case-content'}>
            <span>{samplePost.content}</span>
        </div>
        <div className='post-case-likerate'>
            <div className={'post-case-rate'}>
                <div className={'post-case-sararate'}>{'72%'}</div>
                <div className={'post-case-sararate'}>{'38%'}</div>
            </div>
            <div className={'post-case-graph'}>
                <div style={{ width: '72%' }} className={'post-case-saragraph'}></div>
                <div style={{ width: '38%' }} className={'post-case-maragraph'}></div>
            </div>
        </div>
        <div className={'post-case-likeordislike'}>
            <button className={'post-case-likebtn'} name={'sara'} onClick={(e) => { handleSaraMara(e.target.name) }}>Sara!</button>
            <button className={'post-case-dislikebtn'} name={'mara'} onClick={(e) => { handleSaraMara(e.target.name) }}>Mara!</button>
        </div>
      <div className='post-case-best-comment'>
        <div className='best-like-comment'>
            <div className='comment-item sara'>
            <div className='comment-item-content'>{sampleComments[0]}</div>
            <div className='comment-item-btn-center'>
            <div className='comment-item-like-count'>281</div>
                <FontAwesomeIcon icon={faThumbsUp} />
            </div>
            </div>
            <div className='comment-item sara'>
            <div className='comment-item-content'>{sampleComments[1]}</div>
            <div className='comment-item-btn-center'>
            <div className='comment-item-like-count'>152</div>
                <FontAwesomeIcon icon={faThumbsUp} />
            </div>
            </div>
            <div className='comment-item sara'>
            <div className='comment-item-content'>{sampleComments[2]}</div>
            <div className='comment-item-btn-center'>
            <div className='comment-item-like-count'>96</div>
                <FontAwesomeIcon icon={faThumbsUp} />
            </div>
            </div>
        </div>
        <div className='best-dislike-comment'>
            <div className='comment-item mara'>
            <div className='comment-item-content'>{sampleComments[3]}</div>
            <div className='comment-item-btn-center'>
            <div className='comment-item-like-count'>265</div>
                <FontAwesomeIcon icon={faThumbsUp} />
            </div>
            </div>
            <div className='comment-item mara'>
            <div className='comment-item-content'>{sampleComments[4]}</div>
            <div className='comment-item-btn-center'>
            <div className='comment-item-like-count'>204</div>
                <FontAwesomeIcon icon={faTrashAlt} />
            </div>
            </div>
            <div className='comment-item mara'>
            <div className='comment-item-content'>{sampleComments[5]}</div>
            <div className='comment-item-btn-center'>
            <div className='comment-item-like-count'>176</div>
                <FontAwesomeIcon icon={faThumbsUp} />
            </div>
            </div>
        </div>
      </div>
      
      <div className={'post-case-all-comments'}>
        <span>Sara</span>
        <span>Mara</span>
        <span> 더 보러가기 </span>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
      </div>
    </div>
  </div>)
}


