import React from "react";
import SideBar from "../component/SideBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import logo from "../logo/SalkaMalka_logo_crop.png";

export default function AboutPage() {
  return (
    <div id='about-page'>
      <SideBar></SideBar>
      <div id='ap-content'>
        <img src={logo} alt="logo"/>
        <div>
          <p className='about-salkamalka'>
            입을까, 말까 고민할 땐 코디 어플,<br></br>
            먹을까, 말까 고민할 땐 배달 어플,<br></br>
            여기냐, 저기냐 고민할 땐 부동산 어플!<br></br>
            <br></br>
            그럼, &quot;살까, 말까&quot; 할 땐?<br></br>
            <br></br>
            다른 고민은 다 맡기면서<br></br>
            가장 중요한 소비는 왜 항상 혼자서만 떠맡는 거죠?<br></br>
            살까말까는 자신의 소비에 확신을 가지는 습관을 기르자는 생각에서 출발했습니다.<br></br>
          </p><br></br>
          <h3 className='salka-malka'>살까, 말까?</h3>
          <p className='salka-malka'>
            우리는 소비를 할 때, 왜 그 소비를 했는지 모르는 경우가 종종 있습니다.<br></br>
            건강한 소비란 무엇일까요?<br></br>
            무조건 아끼는 것이 가장 좋은 것일까요?<br></br>
            이 질문에서 시작된 저희 서비스는<br></br>
            사용자로 하여금 간단해 보이는 &quot;살까, 말까&quot; 질문을 작성하는 가운데<br></br>
            왜 그 소비를 하는지 생각하게 해 줍니다.
          </p><br></br>
          <h3 className='history-jujup'>주접의 역사</h3>
          <p className='history-jujup'>
            우리는 사실 주접을 떨기 좋아하는 사람들입니다!<br></br>
            댓글문화와 함께 우리는 자연스럽게 주접떨기를 하나의 문화로 여기며 살아가죠.<br></br>
            그런데 가장 주접 떨기 좋은 주제가 있다면 무엇일까요?<br></br>
            우리가 어릴 적부터 경험해온 주접을 생각해봐요.<br></br>
            <br></br>
            학창 시절, 친구가 어제 학원 끝나고 돌아오는 길에 문방구에서 새로 사 왔다는 걸 구경하겠다고 둘러앉아<br></br>
            서로 신상 딱지를 쳐 보고, 신상 샤프를 써 보겠다고 아우성친 기억이 있나요?<br></br>
            부모님이 사 주셨다는 최신 전자기기를 자랑하는 친구도 있었을 것이고,<br></br>
            입버릇처럼 다음 달에는 꼭 용돈을 모아<br></br>
            비싼 화장품, 브랜드 청바지를 사겠다는 친구도 있었을 것입니다.<br></br>
            서로서로 &quot;그 MP3는 별로야,&quot; &quot;차라리 이 게임 아이템을 사야 해&quot;하고 조언해 준 적도 많을 것이고요.<br></br>
            <br></br>
            시간이 흘러, 서로 사고 싶은 물건도, 써 본 물건도 점점 다양해진 우리들!<br></br>
            같은 주접을 스크린 너머 수많은 사람들과 공유해 본다면 어떨까요?<br></br>
          </p><br></br>
        </div>
        <div>
          <h3 className='about-troika'>
            <span>Troika </span>
            <span>는 누구인가요?</span>
          </h3>
          <div className='about-troika'>
            <div className='team-member'>
              <div className="ap-img-box">
                <img className={'ap-img'} src={''}></img>
              </div>
              <div className='team-member-name'>도하영</div>
              <div>팀장, Full-stack</div>
              <div>
                <FontAwesomeIcon icon={faGithub} />
                <a href='https://github.com/sparklingwater226/'>/@sparklingwater226</a>
              </div>
            </div>
            <div className='team-member'>
              <div className="ap-img-box">
                <img className={'ap-img'} src={''}></img>
              </div>
              <div className='team-member-name'>조양권</div>
              <div>팀원, Front-end</div>
              <div>
                <FontAwesomeIcon icon={faGithub} />
                <a href='https://github.com/whdid502/'>/@whdid502</a>
              </div>
            </div>
            <div className='team-member'>
              <div className="ap-img-box">
                <img className={'ap-img'} src={''}></img>
              </div>
              <div className='team-member-name'>정상규</div>
              <div>팀원, Back-end</div>
              <div>
                <FontAwesomeIcon icon={faGithub} />
                <a href='https://github.com/johnbunnyan/'>/@johnbunnyan</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
