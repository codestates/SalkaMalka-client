import React from "react";
import PostCase from './PostCase.js'
import Nothing from './Nothing';

export default function MyBookMarkContent(props) {
  return (
    !props.displayData.length ? 
      <Nothing whatIsDisplayed={props.whatIsDisplayed}></Nothing>
    :
      <div className={'mp-postlist'}>
        {props.displayData.map((el) => {
          return (
            <PostCase
              key={el._id}
              sara={el.sara}
              mara={el.mara}
              postId={el._id}
              userId={el.userId}
              title={el.title}
              image={el.image}
              content={el.content}
              isOpen={el.isOpen}
              comment={el.comment}
            ></PostCase>
          )
        })}
      </div>
  )
}
