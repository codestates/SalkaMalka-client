import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import SamplePost1 from "../logo/SamplePost1.png";
import { setGuideOpen } from '../actions/index';
require("dotenv").config();

export default function SamplePost() {
  const [sectionType, setSectionType] = useState('first');
  const dispatch = useDispatch();
  const { isGuideOpen } = useSelector(state => state);

  const getClassName = (isGuideOpen) => {
    if (isGuideOpen) return 'sample-post-modal';
    else return 'sample-post-modal display-none';
  }

  const mainContent = (sectionType === 'first') ? (
    <main className={sectionType}>
      <div>살까말까 사용설명서
        <FontAwesomeIcon icon={faArrowRight} onClick={() => {
          setSectionType('second');
        }}/>
      </div>
      <img id='sample-post' src={SamplePost1}></img>
    </main>
  ) : (
    <main className={sectionType}>
      <div>
      <FontAwesomeIcon icon={faArrowLeft} onClick={() => {
        setSectionType('first');
      }}/>
      Why SalkaMalka?</div>
      <div>
        <h3>익명성</h3>
        <h5>내 주변의 의견뿐만 아니라,</h5>
        <h5>불특정 다수의 집단 지성을 이용하고 싶은 당신을 위해!</h5>
        <p>
          살까말까는 기본적으로 대중이 모인 광장의 개념으로,<br />
          모든 사용자가 평등하게 익명으로 활동합니다.<br />
          게시글별로 모든 사용자가 단 하나의 의견만 낼 수 있기에,<br />
          편향 없는 순수한 대중의 입장에서 이 소비가 정당한 소비인지 정확한 데이터를 판단 가능해요.
        </p>
        <h3>흥미성</h3>
        <h5>얼굴 없는 대중 속에서 돋보이고 싶은 당신을 위해!</h5>
        <p>
          TOP 3 Sara! Mara! 에 들거나,<br />
          글쓴이에게 가장 설득력 있는 의견으로 채택이 되면 포인트를 얻을 수 있어요.<br />
          전 사이트를 통틀어 가장 포인트가 많은 회원에게<br />
          살까말까킹이 되는 명예를 드립니다!<br />
          살까말까킹이 등록한 댓글은 수많은 의견 가운데에서 더 돋보이게 꾸며집니다.
        </p>
        <h3>편의성</h3>
        <h5>대중의 승인을 받자마자 바로 지르고 싶은 당신을 위해!</h5>
        <p>
          내가 하고 싶은 소비가 대중의 인정을 받게 되었어요. 그 다음에는 어떻게 되죠?<br />
          Sara! 비율이 일정 비율 이상이 되면 사러가기 버튼이 활성화돼요.<br />
          사러가기 버튼을 클릭하면 바로 네이버 쇼핑으로 이동되어 구매가 가능합니다.
        </p>
      </div>
    </main>
  )


  return (
    <div className={getClassName(isGuideOpen)}>
      <section className={sectionType}>
        <FontAwesomeIcon icon={faTimes} onClick={() => {
          dispatch(setGuideOpen(false));
        }}/>
        {mainContent}
      </section>
    </div>
  )
}
