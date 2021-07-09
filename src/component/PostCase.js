import React, { useEffect, useState } from "react";
import CommentList from "./CommentList";
import CommentListItem from "./CommentListItem";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Route } from "react-router-dom";
import { useHistory } from "react-router";
import { setBookmarks, setPosts, setClosed, setReplied } from '../actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBookmark as fasfaBookmark, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as farfaBookmark, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
require("dotenv").config();


export default function PostCase(props) {
  const dispatch = useDispatch();
  const pathName = window.location.pathname;
  const [isCommentModalOpen, setCommentModalOpen] = useState(false); //코멘트 모달창 관리
  const [saraMara, setSaraMara] = useState(''); // 전송용 사라 마라 상태 관리
  const [isDisplayCommentModal, setDisplayCommentModal] = useState(false);
  const { userId, isSignIn, accessToken, bookmarks, openPosts, closedPosts, repliedPosts } = useSelector(state => state);
  const { postId } = props;
  const history = useHistory();
  const [commentList, setCommentList] = useState(props.comment);
  const [sara , setSara] = useState(props.sara)
  const [mara, setMara] = useState(props.mara)
  console.log(props.title, sara,mara)
  
  const getBestComment = (type, data) => {
    let result = data.filter(i => i.type === type);
    result.sort(function (a, b) {
      return a.like > b.like ? -1 : a.like < b.like ? 1 : 0;
    }).slice(0, 3)
    return result.slice(0, 3);
  }

  const [bestSara, setBestSara] = useState(getBestComment('sara', commentList));
  const [bestMara, setBestMara] = useState(getBestComment('mara', commentList)); // 상위 3개 댓글 추출

  useEffect(() => {
    setBestSara(getBestComment('sara', commentList));
    setBestMara(getBestComment('mara', commentList));
  }, [commentList])

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
        if (e.response && (e.response.status === 404 || e.response.status === 409)) alert(e.response.data);
      });
  }

  const getRate = (type) => {
    if (type === 'sara') {
      return (sara / (sara + mara) * 100);
    } else {
      return (mara / (sara + mara) * 100);
    }
  }

  const formatRate = (rate) => {
    if (!isNaN(rate)) {
      return Math.round(rate * 10) / 10;
    }
    return 0;
  }

  const handleBookmark = () => {
    if (!isSignIn) {
      alert('로그인이 필요한 기능이에요');
      return;
    }
    axios
      .post(process.env.REACT_APP_API_ENDPOINT + '/users/' + userId + '/bookmarks',
        {
          postId: postId
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then(res => {
        alert(res.data);
        dispatch(setBookmarks([...bookmarks, postId]));
      })
      .catch(e => console.log(e));
  }

  const handleUnBookmark = () => {
    axios
      .delete(process.env.REACT_APP_API_ENDPOINT + '/users/' + userId + '/bookmarks/' + postId,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then(res => {
        alert(res.data);
        const bms = bookmarks.slice();
        bms.splice(bms.indexOf(postId), 1);
        dispatch(setBookmarks(bms));
      })
      .catch(e => console.log(e));
  }

  const handlePostClose = () => {
    if (confirm('살까말까를 닫으면 더이상 사라마라를 받을 수 없어요')) {
      axios
        .patch(process.env.REACT_APP_API_ENDPOINT + '/posts/' + postId, {},
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        )
        .then(res => {
          if (pathName === '/search' || pathName === '/main') {
            history.push('/');
          } else if (pathName === `/users/${userId}`) {
            const ps = openPosts.slice();
            ps.splice(ps.indexOf(postId), 1);
            dispatch(setPosts(ps));
            dispatch(setClosed([...closedPosts, postId]));
            window.location.reload(false);
          }
        })
        .catch(e => console.log(e));
    } else {
      return;
    }
  }

  const handlePostDelete = () => {
    if (confirm('살까말까를 삭제하면 더이상 사라마라를 받을 수 없어요')) {
      axios
        .delete(process.env.REACT_APP_API_ENDPOINT + '/posts/' + postId,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        )
        .then(res => {
          if (pathName === '/search' || pathName === '/main') {
            history.push('/');
          }
          else if (pathName === `/users/${userId}`) {
            if (props.isOpen) {
              const ps = openPosts.slice();
              ps.splice(ps.indexOf(postId), 1);
              dispatch(setPosts(ps));
            } else {
              const ps = closedPosts.slice();
              ps.splice(ps.indexOf(postId), 1);
              dispatch(setClosed(ps));
            }
          }
        })
        .catch(e => console.log(e));
    } else {
      return;
    }
  }

  function handleImageURL(image) {
    if (image) {
      return (<img src={`${process.env.REACT_APP_API_ENDPOINT}/${image}`}></img>)
    }
  }
  
  const sliceBestComment = (content) => {
    if (content.length < 50) return content;
    return content.slice(0,50) + ' (...)'
  }

  return (
    <div className={props.isOpen ? 'post-case' : 'post-case closed'}>
      {props.isOpen ? null : <div>닫혀 있는 살까말까에는 사라마라를 보낼 수 없어요.</div>}
      <div className={'post-case-header'}>
        <div className={'post-case-title'}>{props.title}</div>
        <Route
          render={() => {
            if (userId === props.userId) { // 내 글: 닫기+삭제 or 삭제
              if (props.isOpen) {
                return <div className='btn-center'>
                  <button onClick={handlePostClose}>닫기</button>
                  <FontAwesomeIcon icon={faTrashAlt} onClick={handlePostDelete}/>
                </div>
              } else {
                return <div className='btn-center'>
                  <FontAwesomeIcon icon={faTrashAlt} onClick={handlePostDelete}/>
                </div>
              }
            }
            else if (bookmarks.includes(postId)) { // 남의 글: 북마크 or 북마크 해제
              return <div className='btn-center'>
                <FontAwesomeIcon icon={fasfaBookmark} onClick={handleUnBookmark}/>
              </div>
            } else {
              return <div className='btn-center'>
                <FontAwesomeIcon icon={farfaBookmark} onClick={handleBookmark}/>
              </div>
            }
          }}
        />
      </div>
      <div className={'post-case-body'}>
        {props.image ? (
          <div className={'post-case-img-box'}>
            {handleImageURL(props.image)}
          </div>
        ) : (
          null
        )}
        <div className={'post-case-content'}>{props.content}</div>
        {repliedPosts.includes(postId) || !props.isOpen || userId === props.userId ? (
          <div className={'post-case-likerate'}>
            <div className={'post-case-rate'}>
              <div className={'post-case-sararate'}>{formatRate(getRate('sara')) + '%'}</div>
              <div className={'post-case-sararate'}>{formatRate(getRate('mara')) + '%'}</div>
            </div>
            <div className={'post-case-graph'}>
              <div style={{ width: getRate('sara') + '%' }} className={'post-case-saragraph'}></div>
              <div style={{ width: getRate('mara') + '%' }} className={'post-case-maragraph'}></div>
            </div>
          </div>
        ) : (
          <div className={'post-case-likeordislike'}>
            <button className={'post-case-likebtn'} name={'sara'} onClick={(e) => { handleSaraMara(e.target.name) }}>Sara!</button>
            <button className={'post-case-dislikebtn'} name={'mara'} onClick={(e) => { handleSaraMara(e.target.name) }}>Mara!</button>
          </div>
        )}
        <div className={'post-case-best-comment'}>
          <div className={'post-case-best-like-comment'}>
            {bestSara.map((el) => {
              return (
                <CommentListItem
                  key={el._id}
                  isInMyPage={props.isInMyPage}
                  type={el.type}
                  content={sliceBestComment(el.content)}
                  like={el.like}
                  postId={postId}
                  commentId={el._id}
                  userId={el.userId}
                  isOpen={props.isOpen}
                  setCommentList={setCommentList}
                ></CommentListItem>
              )
            })}
          </div>
          <div className={'post-case-best-dislike-comment'}>
            {bestMara.map((el) => {
              return (
                <CommentListItem
                  key={el._id}
                  isInMyPage={props.isInMyPage}
                  type={el.type}
                  content={sliceBestComment(el.content)}
                  like={el.like}
                  postId={postId}
                  commentId={el._id}
                  userId={el.userId}
                  isOpen={props.isOpen}
                  setCommentList={setCommentList}
                ></CommentListItem>
              )
            })}
          </div>
        </div>
        <div className={isDisplayCommentModal ?
          'post-case-all-comments hidden' : 'post-case-all-comments'} onClick={() => { setDisplayCommentModal(true) }}>
          <span>Sara</span>
          <span>Mara</span>
          <span> 더 보러가기 </span>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>

      {/* 댓글등록 모달창 */}
      <div className={isCommentModalOpen ? 'open-write-comment-modal write-comment-modal' : 'write-comment-modal'}>
        <section className={saraMara === 'sara' ? 'write-sara-comment' : 'write-mara-comment'}>
          <header>
            <FontAwesomeIcon icon={faTimes} onClick={() => { setCommentModalOpen(false) }}/>
            <div>내용 없이 사라마라를 보내려면 지금 바로 등록 버튼을 눌러주세요!</div>
          </header>
          <main>
            <textarea onFocus={(e) => e.target.value = ''} type={'text'}></textarea>
            <button onClick={(e) => { handleComment(e) }}>등록</button>
          </main>
        </section>
      </div>

      {/* 댓글보기 모달창 */}
      <div className={isDisplayCommentModal ? 'open-comment-modal comment-modal' : 'comment-modal'}>
        <section>
          <header>
            <FontAwesomeIcon icon={faTimes} onClick={() => { setDisplayCommentModal(false) }}/>
            {props.isOpen ? null : <div>닫혀 있는 살까말까에는 사라마라를 보낼 수 없어요.</div>}
          </header>
          <main>
            <CommentList
              isDisplayCommentModal={isDisplayCommentModal}
              setDisplayCommentModal={setDisplayCommentModal}
              comment={commentList}
              postId={postId}
              isOpen={props.isOpen}
              setCommentList={setCommentList}
            ></CommentList>
          </main>
        </section>
      </div>
    </div>
  )
}
