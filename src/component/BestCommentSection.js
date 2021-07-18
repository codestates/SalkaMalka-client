import React from "react";
import Nothing from './Nothing'
import BestComments from './BestComments'

export default function BestCommentSection({ bestSara, bestMara, isOpen, commentList, setCommentList, postId, OP }) {
  if (bestSara.length === 0 && bestMara.length === 0) {
    return (
      <div className='post-case-best-comment nothing'>
        <Nothing></Nothing>
      </div>
    )
  }
  else if (bestSara.length === 0) {
    return (
      <div className='post-case-best-comment'>
        <Nothing></Nothing>
        <BestComments
          bestMara={bestMara}
          type={'mara'}
          isOpen={isOpen}
          commentList={commentList}
          setCommentList={setCommentList}
          postId={postId}
          OP={OP}
        />
      </div>
    );
  }
  else if (bestMara.length === 0) {
    return (
      <div className='post-case-best-comment'>
        <BestComments
          bestSara={bestSara}
          type={'sara'}
          isOpen={isOpen}
          commentList={commentList}
          setCommentList={setCommentList}
          postId={postId}
          OP={OP}
        />
       <Nothing></Nothing>
      </div>
    );
  }
  else {
    return (
      <div className='post-case-best-comment'>
        <BestComments
          bestSara={bestSara}
          type={'sara'}
          isOpen={isOpen}
          commentList={commentList}
          setCommentList={setCommentList}
          postId={postId}
          OP={OP}
        />
       <BestComments
          bestMara={bestMara}
          type={'mara'}
          isOpen={isOpen}
          commentList={commentList}
          setCommentList={setCommentList}
          postId={postId}
          OP={OP}
       />
     </div>
    );
  }
}
