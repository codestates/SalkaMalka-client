import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import PostButtonCenter from './PostButtonCenter';
import BestCommentSection from "./BestCommentSection";
import WriteModal from "./WriteModal";
import DisplayModal from "./DisplayModal";
import SaraMaraSection from "./SaraMaraSection";
require("dotenv").config();


export default function PostCase(props) {
  const [isCommentModalOpen, setCommentModalOpen] = useState(false); //코멘트 모달창 관리
  const [saraMara, setSaraMara] = useState(''); // 전송용 사라 마라 상태 관리
  const [isDisplayCommentModal, setDisplayCommentModal] = useState(false);
  const { postId } = props;
  const [commentList, setCommentList] = useState(props.comment);
  const [sara, setSara] = useState(props.sara)
  const [mara, setMara] = useState(props.mara)

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


  function handleImageURL(image) {
    if (image) {
      return (<img src={`${process.env.REACT_APP_API_ENDPOINT}/${image}`}></img>)
    }
  }

  return (
    <div className={props.isOpen ? 'post-case' : 'post-case closed'}>
      {props.isOpen ? null : <div className='closed-msg'>닫혀 있는 살까말까에는 사라마라를 보낼 수 없어요.</div>}
      <div className={'post-case-header'}>
        <div className={'post-case-title'}>{props.title}</div>
        <PostButtonCenter isOpen={props.isOpen} userId={props.userId} postId={postId} />
      </div>
      <div className={'post-case-body'}>
        <div className={'post-case-img-box'}>{handleImageURL(props.image)}</div>
        <div className={'post-case-content'}>
          {props.content.split('\n').map((line,idx) => {
            return (
              <span key={idx}>
                {line}
                <br />
              </span>
            )
          })}
        </div>
        <SaraMaraSection
          setCommentModalOpen={setCommentModalOpen}
          saraMara={saraMara}
          setSaraMara={saraMara}
          sara={sara}
          mara={mara}
          postId={postId}
          isOpen={props.isOpen}
          OP={props.userId}
        />
        <BestCommentSection bestSara={bestSara} bestMara={bestMara} isOpen={props.isOpen} setCommentList={setCommentList} postId={postId} />
        <div className={isDisplayCommentModal || commentList.length === 0 ?
          'post-case-all-comments hidden' : 'post-case-all-comments'} onClick={() => { setDisplayCommentModal(true) }}>
          <span>Sara</span>
          <span>Mara</span>
          <span> 더 보러가기 </span>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
      <WriteModal
        postId={postId}
        saraMara={saraMara}
        isCommentModalOpen={isCommentModalOpen}
        setCommentModalOpen={setCommentModalOpen}
        setSara={setSara}
        setMara={setMara}
        setCommentList={setCommentList}
      />
      <DisplayModal
        postId={postId}
        isDisplayCommentModal={isDisplayCommentModal}
        setDisplayCommentModal={setDisplayCommentModal}
        isOpen={props.isOpen}
        setCommentList={setCommentList}
        commentList={commentList}
      />
   </div>
  )
}
