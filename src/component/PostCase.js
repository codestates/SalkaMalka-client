import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux';
import PostButtonCenter from './PostButtonCenter';
import BestCommentSection from "./BestCommentSection";
import WriteModal from "./WriteModal";
import DisplayModal from "./DisplayModal";
import SaraMaraSection from "./SaraMaraSection";
import { setAlertOpen } from '../actions/index';
import naver from '../logo/01 NAVER Logo_Green.png'
require("dotenv").config();


export default function PostCase(props) {
  const dispatch = useDispatch();
  const [isCommentModalOpen, setCommentModalOpen] = useState(false); //코멘트 모달창 관리
  const [saraMara, setSaraMara] = useState(''); // 전송용 사라 마라 상태 관리
  const [isDisplayCommentModal, setDisplayCommentModal] = useState(false);
  const { postId } = props;
  const [commentList, setCommentList] = useState(props.comment);
  const [sara, setSara] = useState(props.sara)
  const [mara, setMara] = useState(props.mara)
  const { userId } = useSelector(state => state);
  const [isCloseState, setCloseState] = useState(false)
  const [chosenComment, setChosenComment] = useState(null)
  const [isOpen, setIsOpen] = useState(props.isOpen)

  useEffect(() => {
    setCommentList(props.comment);
  }, [props.comment])

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen])

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
  
  const handleSarasite = (target) => {
    if (sara > 3 && formatRate(getRate('sara')) >= 80) {
      window.open(`https://search.shopping.naver.com/search/all?query=${target}&cat_id=&frm=NVSHATC`, "Code",
      'scrollbars=yes, width=' + 800 + ', height=' + 800 + ', top=' + 800 + ', left=' + 800);
    }
    else {
      dispatch(setAlertOpen(true, '아직 Sara! 투표가 부족해요. 조금만 더 생각해보세요!'))
    }
   }

  function handleImageURL(image) {
    if (image) {
      return (<img src={`${process.env.REACT_APP_API_ENDPOINT}/${image}`}></img>)
    }
  }

  const handleSarasite = (target) => {
    
   console.log(target)
 window.open(`https://search.shopping.naver.com/search/all?query=${target}&cat_id=&frm=NVSHATC`, "Code",
     'scrollbars=yes, width=' + 800 + ', height=' + 800 + ', top=' + 800 + ', left=' + 800);



  }

  const formatRate = (rate) => {
    if (!isNaN(rate)) {
      return Math.round(rate * 10) / 10;
    }
    return 0;
  }

  const getWidth = (rate) => {
    if (sara + mara === 0) return '50%';
    else return rate + '%';
  }

  const getRate = (type) => {
    if (type === 'sara') return (sara / (sara + mara) * 100);
    else return (mara / (sara + mara) * 100);
  }

  const handleDisplayComment = async () => {
    await setCloseState(false)
    setDisplayCommentModal(true)
  }

  return (
    <div className={isOpen ? 'post-case' : 'post-case closed'}>
      {isOpen ? null : <div className='closed-msg'>닫혀 있는 살까말까에는 사라마라를 보낼 수 없어요.</div>}
      <div className={'post-case-header'}>
        <div className={'post-case-title'}>{props.title}</div>
        <PostButtonCenter
          setDisplayCommentModal={setDisplayCommentModal}
          setCloseState={setCloseState}
          isOpen={isOpen}
          userId={props.userId}
          postId={postId}
        />
      </div>
      <div className={'post-case-body'}>
        <div className={'post-case-img-box'}>{handleImageURL(props.image)}</div>
        <div className={'post-case-content'}>
          {props.content.split('\n').map((line, idx) => {
            return (
              <span key={idx}>
                {line}
                <br />
              </span>
            )
          })}
        </div>
        {userId === props.userId
          ? <div className={'sara-keyword'}>
            <div className={'sara-keyword-site'} name={'keyword'} onClick={(e) => { handleSarasite(props.keyword) }}>
              <img src={naver} alt='naver'></img>
              <div>쇼핑에서</div>
              <div>{props.keyword}</div>
              <div>사러가기</div>
            </div>
          </div>
          : null
        }
        <SaraMaraSection
          setCommentModalOpen={setCommentModalOpen}
          formatRate={formatRate}
          getRate={getRate}
          getWidth={getWidth}
          saraMara={saraMara}
          setSaraMara={setSaraMara}
          sara={props.sara}
          mara={props.mara}
          postId={postId}
          isOpen={isOpen}
          OP={props.userId}
        />
        <BestCommentSection
          bestSara={bestSara}
          bestMara={bestMara}
          isOpen={isOpen}
          commentList={commentList}
          setCommentList={setCommentList}
          postId={postId}
          OP={props.userId}
        />
        <div className={isDisplayCommentModal || props.comment.length === 0 ?
          'post-case-all-comments hidden' : 'post-case-all-comments'} onClick={handleDisplayComment}>
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
        bestComment={[...bestSara, ...bestMara]}
        chosenComment={chosenComment}
        setIsOpen={setIsOpen}
        isCloseState={isCloseState}
        setChosenComment={setChosenComment}
        postId={postId}
        isDisplayCommentModal={isDisplayCommentModal}
        setDisplayCommentModal={setDisplayCommentModal}
        isOpen={isOpen}
        setCommentList={setCommentList}
        commentList={commentList}
      />
    </div>
  )
}
