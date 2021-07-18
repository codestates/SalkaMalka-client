import React from "react";
import PostCase from './PostCase.js'
import { useSelector } from 'react-redux';
import Nothing from './Nothing';

export default function MyPostContent(props) {
  const { openPosts, closedPosts } = useSelector(state => state);
  const displayData = props.displayData.filter(el => [...openPosts, ...closedPosts].includes(el._id));

  return (
    !displayData.length ?
      <Nothing whatIsDisplayed={props.whatIsDisplayed}></Nothing>
    :
      <div className={'mp-postlist'}>
        {displayData.map((el) => {
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
