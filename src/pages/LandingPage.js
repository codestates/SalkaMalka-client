import React, { useState, useEffect } from "react";
import SideBar from "../component/SideBar";
import PostCase from "../component/PostCase";
import { useSelector } from 'react-redux';
import { useHistory } from "react-router";
import axios from "axios";
require("dotenv").config();

export default function LandingPage() {
  const history = useHistory();
  const pathname = window.location.pathname;
  const [postOptions, setPostOptions] = useState({
    items: 5,
    preItems: 0
  })
  const [postData, setPostData] = useState([]);
  const [data, setData] = useState({
    posts: []
  });

  const { isSignIn, queryString } = useSelector(state => state);

  useEffect(() => {
    console.log('load landing');
    if (pathname === '/search') {
      const encoded = encodeURI(encodeURIComponent(queryString));
      const uri = process.env.REACT_APP_API_ENDPOINT + '/search?q=' + encoded;
      axios
      .get(uri)
      .then(res => {
        console.log(res.data)
        setData(res.data)
      })
      .catch(e => console.log(e));
      return;
    }
    sortPosts('date');
  }, [pathname, queryString])

  // useEffect(() => {
  //   console.log('fired')
  //   const displayPost = data.posts.slice(postOptions.preItems, postOptions.items);
  //   const arr = [...postData, ...displayPost];
  //   setPostData(arr.filter((el, idx) => arr.indexOf(el) === idx));
    
  //   window.addEventListener("scroll", infiniteScroll, true);
  //   setPostData(data.posts);
  // }, [data, postOptions])

  const sortPosts = (sort) => {
    history.push(`/main?sort=${sort}`);
    axios
    .get(process.env.REACT_APP_API_ENDPOINT + '/main?sort=' + sort)
    .then(res => setData(res.data))
    .catch(e => console.log(e));
  }

  const infiniteScroll = () => {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPostOptions({
        preItems: postOptions.items,
        items: postOptions.items + 10,
      });
    }
  };

  // console.log(postData)
  return (
    <div className={'landing-page'}>
      <SideBar />
      <div className={'lp-content'}>
        <div className={isSignIn ? 'lp-description display-none' : 'lp-description'}>
          <div className={'lp-description-text'}></div>
          <div className={'lp-description-img-box'}>
            <div className={'lp-description-img'}></div>
          </div>
        </div>
            
        <div className={'lp-postlist'}>
          {pathname === '/search' ? <div id='search-message'>{'검색어: ' + queryString}</div> : null}
          <div id='sort-btn-container'>
            <button onClick={() => {sortPosts('date')}}>최신순</button>
            <button onClick={() => {sortPosts('popular')}}>인기글</button>
            <button onClick={() => {sortPosts('hot-topic')}}>뜨거운 감자</button>
          </div>
          {data.posts.map((el) => {
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
                comment={el.comment}>
              </PostCase>
            )
          })}
        </div>
      </div>
    </div>
  )
}