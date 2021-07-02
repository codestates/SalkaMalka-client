import React from "react";
import PostCase from './PostCase.js'

export default function MyBookBarkContent(props) {
  // console.log(props)
  return (
    <div className={'mp-postlist'}>
      {props.displayData.map((el) => {
        return (
          <PostCase key={el._id} sara={el.sara} mara={el.mara} postId={el._id} userId={el.userId} title={el.title} image={el.image} content={el.content} isOpen={el.isOpen} comment={el.comment}></PostCase>
        )
      })}
    </div>
  )
}
