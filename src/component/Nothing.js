import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSadTear } from '@fortawesome/free-regular-svg-icons'

export default function Nothing({ whatIsDisplayed }) {
  const nothingMessage = () => {
    if (whatIsDisplayed === 'Posts') return '새로운 살까말까를 작성해보세요.'
    else if (whatIsDisplayed === 'Comments') return '새로운 사라마라를 남겨보세요.'
    else if (whatIsDisplayed === 'Bookmarks') return '새로운 북마크를 추가해보세요.'
    else if (whatIsDisplayed === 'Search') return '직접 살까말까를 작성해보세요.'
  }
  return (
    <div className={!whatIsDisplayed ? 'nothing' : 'nothing with-message'}>
      <FontAwesomeIcon icon={faSadTear} />
      <div className='nothing-msg-default'>아무것도 없어요! </div>
      <div className='nothing-msg'>{nothingMessage()}</div>
    </div>
  )
}
