import React, { useEffect } from "react";
import SideBar from "../component/SideBar";
import Slide1 from "../logo/Slide1.png";
import Slide2 from "../logo/Slide2.png";
import Slide3 from "../logo/Slide3.png";
import logoSquare from "../logo/SalkaMalka_logo_square.png";
import Slide22 from "../logo/Slide2.2.png";
import Slide32 from "../logo/Slide3.2.png";
import Slide2_480 from "../logo/Slide2_480.png";
import Slide3_480 from "../logo/Slide3_480.png";
import { useHistory } from "react-router";
import { useInView } from 'react-intersection-observer';
import { setGuideOpen } from '../actions/index';
import { useDispatch } from 'react-redux';


export default function GuidePage() {
  const dispatch = useDispatch();

  const [ref1, inView1, entry1] = useInView({
    "threshold": 0
  })
  const [ref2, inView2, entry2] = useInView({
    "threshold": 0.3
  })
  const [ref3, inView3, entry3] = useInView({
    "threshold": 0.3
  })
  const [ref4, inView4, entry4] = useInView({
    "threshold": 0.3
  })
  const [ref5, inView5, entry5] = useInView({
    "threshold": 0.3
  })
  const [ref6, inView6, entry6] = useInView({
    "threshold": 0.3
  })
  const history = useHistory();
  useEffect(() => {
    if (inView1) {
      entry1.target.style.opacity = 1;
      entry1.target.style.marginTop = 0;
    }
    if (inView2) {
      entry2.target.style.opacity = 1;
      entry2.target.style.top = '100vh';
    }
    if (inView3) {
      entry3.target.style.opacity = 1;
      entry3.target.style.top = '100vh';
    }
    if (inView4) {
      entry4.target.style.opacity = 1;
      entry4.target.style.marginRight = 0;
    }
    if (inView5) {
      entry5.target.style.opacity = 1;
      entry5.target.style.marginLeft = 0;
    }
    if (inView6) {
      entry6.target.style.opacity = 1;
      entry6.target.style.transform = 'rotate( 0deg )';
    }
  }, [inView1, inView2, inView3, inView4, inView5, inView6]);
  if (window.innerWidth > 480) {
    return (
      <div id='guide-page'>
        <SideBar />
        <div className='slide one'>
          <img ref={ref1} className='slide one' src={Slide1}/>
        </div>
        <div className='slide two'>
          <div ref={ref3} className='slide two text'>
            <div>살까 말까?</div>
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
                if (window.innerWidth > 720) dispatch(setGuideOpen(true));
              }}>시작하기</button>
            </div>
      </div>
    )

  } else {
    return (
      <div id='guide-page'>
        <SideBar />
        <div className='slide one'>
          <img ref={ref1} className='slide one' src={Slide1}/>
        </div>
        <div className='slide two'>
          <div ref={ref5} className='slide two text'>
            <div>살까 말까?</div>
            <div>혼자 고민하지 마세요</div>
            <div>페이스북, 트위터처럼 간단하게 나의 고민을 올리고 필요하면 사진도 공유해보세요. 당신의 소비에 확신을 줄 주접러들이 기다리고 있어요!</div>
          </div>
          <img src={Slide2_480} className='slide two small' />
        </div>
        <div className='slide three'>
          <div ref={ref4} className='slide three text'>
            <div>사라 마라!</div>
            <div>따끔하게 조언해주세요</div>
            <div>인생의 멘토는 드물지만,</div>
            <div>소비의 멘토는 어디에나 있습니다.</div>
            <div>때론 친구처럼, 때론 엄한 부모님처럼 소비에 확신을 더해주세요!</div>
          </div>
          <img src={Slide3_480} className='slide three small' />
        </div>
          <div id='to-main'>
              <img ref={ref6} src={logoSquare} />
              <div>지금 바로 체험해 보세요!</div>
              <button onClick={() => {
                history.push('/main?sort=date');
              }}>시작하기</button>
            </div>
      </div>
    )
  }
  
}