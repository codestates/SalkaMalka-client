import React, { useEffect } from "react";
import SideBar from "../component/SideBar";
import Slide1 from "../logo/Slide1.png";
import Slide2 from "../logo/Slide2.png";
import Slide3 from "../logo/Slide3.png";
import logoSquare from "../logo/SalkaMalka_logo_square.png";
import Slide22 from "../logo/Slide2.2.png";
import Slide32 from "../logo/Slide3.2.png";
import { useHistory } from "react-router";
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { setGuideOpen } from '../actions/index';
import { useDispatch } from 'react-redux';


export default function GuidePage() {
  const dispatch = useDispatch();

  const [ref1, inView1, entry1] = useInView({
    "threshold": 0
  })
  const [ref2, inView2, entry2] = useInView({
    "threshold": 0
  })
  const [ref3, inView3, entry3] = useInView({
    "threshold": 0
  })
  const [ref4, inView4, entry4] = useInView({
    "threshold": 0
  })
  const [ref5, inView5, entry5] = useInView({
    "threshold": 0
  })
  const [ref6, inView6, entry6] = useInView({
    "threshold": 0
  })
  const history = useHistory();
  useEffect(() => {
    if (inView1) {
      entry1.target.style.opacity = 1;
      entry1.target.style.bottom = 0;
    }
    // else if (entry1 & !inView1) {
    //   console.log('not inview')
    //   entry1.target.style.opacity = 0.1;
    //   entry1.target.style.bottom = '70px';
    // }
    if (inView2) {
      entry2.target.style.opacity = 1;
      entry2.target.style.top = 0;
    }
    if (inView3) {
      entry3.target.style.opacity = 1;
      entry3.target.style.marginTop = '40vh';
    }
    if (inView4) {
      entry4.target.style.opacity = 1;
      entry4.target.style.marginLeft = '80px';
    }
    if (inView5) {
      entry5.target.style.opacity = 1;
      entry5.target.style.right = 0;
    }
    if (inView6) {
      entry6.target.style.marginTop = '150px';
      entry6.target.style.marginBottom = '50px';
      entry6.target.style.opacity = 1;
      entry6.target.style.transform = 'rotate( 0deg )';
    }
  }, [inView1, inView2, inView3, inView4, inView5, inView6]);

  return (
    <div id='guide-page'>
      <SideBar />
      <div className='slide one'>
        <img ref={ref1} className='slide one' src={Slide1}/>
        <button id='skip-btn' onClick={() => {
          dispatch(setGuideOpen(true));
          history.push('/main?sort=date')
        }}>skip
        <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      <div className='slide two'>
        <div ref={ref3} className='slide two text'>
          <div>살까말까?</div>
          <div>혼자 고민하지 마세요</div>
          <div>페이스북, 트위터처럼 간단하게 나의 고민을 올리고 필요하면 사진도 공유해보세요. 당신의 소비에 확신을 줄 주접러들이 기다리고 있어요!</div>
        </div>
        <img className='slide two' src={Slide2}/>
        <img ref={ref2} className='slide two' src={Slide22}/>
      </div>
      <div className='slide three'>
        <div ref={ref4} className='slide three text'>
          <div>사라 마라!</div>
          <div>따끔하게 조언해주세요</div>
          <div>인생의 멘토는 드물지만,</div>
          <div>소비의 멘토는 어디에나 있습니다.</div>
          <div>때론 친구처럼, 때론 엄한 부모님처럼 소비에 확신을 더해주세요!</div>
        </div>
        <img className='slide three' src={Slide3}/>
        <img  ref={ref5} className='slide three' src={Slide32}/>
      </div>
        <div id='to-main'>
            <img ref={ref6} src={logoSquare} />
            <div>지금 바로 체험해 보세요!</div>
            <button onClick={() => {
              history.push('/main?sort=date');
              dispatch(setGuideOpen(true));
            }}>시작하기</button>
          </div>
    </div>
  )
}