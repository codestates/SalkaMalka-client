import React, { useState, useEffect, useCallback } from "react";
import SideBar from "../component/SideBar";
import PostCase from "../component/PostCase";
import GuideModal from "../component/GuideModal";
import Nothing from '../component/Nothing';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router";
import axios from "axios";
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward, faFire, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { setLoading, setKing } from '../actions/index';


require("dotenv").config();

export default function LandingPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const pathname = window.location.pathname;
  const [data, setData] = useState([]);
  const [ref, inView] = useInView()
  const [scrollLoading, setScrollLoading] = useState(false)
  const [sortValue, setSortValue] = useState('date')
  const [postOptions, setPostOptions] = useState({
    preItems: 0,
    items: 5
  })
  const [initPostOptions, setInitPostOptions] = useState({
    preItems: 0,
    items: 5
  })
  const { isSignIn, queryString, isLoading } = useSelector(state => state);

  useEffect(() => {
    console.log('useEffect 1')
    if (pathname === '/search') {
      const encoded = encodeURI(encodeURIComponent(queryString));
      const uri = process.env.REACT_APP_API_ENDPOINT + '/search?q=' + encoded;
      dispatch(setLoading(true))
      axios
        .get(uri)
        .then(res => {
          console.log(res.data.posts);
          console.log(res.data.posts.map(el => [el.title, el.content, el.comment]));
          setData(res.data.posts)
        })
        .then(() => dispatch(setLoading(false)))
        .catch(e => console.log(e));
      return;
    }
  }, [pathname, queryString]) // 검색시 리랜더링

  const sortPosts = useCallback(async (sort) => {

    if (postOptions.preItems !== 0) {
      setScrollLoading(true)
      if (pathname !== '/search') {
        await axios
          .get(process.env.REACT_APP_API_ENDPOINT + '/main?sort=' + sort)
          .then(res => {
            console.log(res.data.posts);
            let post = res.data.posts.slice(postOptions.preItems, postOptions.items)
            setData(pre => [...pre, ...post])
          })
          .catch(e => console.log(e));
      } 
    }
  }, [postOptions])

  useEffect(() => {
    sortPosts(sortValue)
    setScrollLoading(false)
  }, [sortPosts])

  useEffect(() => {
    console.log('useEffect 2')
    console.log(sortValue)
    if (pathname === '/main') {
      console.log('useEffect 2')
      dispatch(setLoading(true))
      axios
        .get(process.env.REACT_APP_API_ENDPOINT + '/main?sort=' + sortValue)
        .then(res => {
          console.log(res.data.posts)
          let post = res.data.posts.slice(initPostOptions.preItems, initPostOptions.items)
          dispatch(setKing(res.data.Salkamalkaking))
          setData(post)
        })
        .then(setPostOptions({
          preItems: 0,
          items: 5
        }))
        .then(dispatch(setLoading(false)))
        .catch(e => console.log(e));
    }
  }, [sortValue])

  useEffect(() => {
    console.log('useEffect 3')
    if (inView && !scrollLoading) {
      setPostOptions({
        preItems: postOptions.items,
        items: postOptions.items + 5
      })
    }
  }, [inView, scrollLoading])

  const handleQuery = (sortValue) => {
    history.push(`/main?sort=${sortValue}`);
    setSortValue(sortValue)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className={'landing-page'}>
      <SideBar />
        <div className={'lp-content'}>
          <div className={'lp-postlist'}>
            <GuideModal />
            {pathname === '/main' ? <div id='sort-btn-container'>
              <div className={window.location.href.split('=')[1] === 'date' ? 'sort-btn current' : 'sort-btn'} onClick={() => { handleQuery('date') }}>
                <FontAwesomeIcon icon={faClock} className='fa-3x' />
                <div>최신 등록</div>
              </div>
              <div className={window.location.href.split('=')[1] === 'popular' ? 'sort-btn current' : 'sort-btn'} onClick={() => { handleQuery('popular') }}>
                <FontAwesomeIcon icon={faAward} className='fa-3x' />
                <div>댓글 수</div>
              </div>
              <div className={window.location.href.split('=')[1] === 'hot-topic' ? 'sort-btn current' : 'sort-btn'} onClick={() => { handleQuery('hot-topic') }}>
                <FontAwesomeIcon icon={faFire} className='fa-3x' />
                <div>뜨거운 감자</div>
              </div>
            </div> : <div id='search-message'>{`검색어: '${queryString}'`}</div>}

            {!data.length ? <Nothing whatIsDisplayed={'Search'}></Nothing> : data.map((el, idx) => {
              if (data.length - 1 === idx) {
                return (
                  <div ref={ref}>
                    <PostCase
                      key={idx}
                      sara={el.sara}
                      mara={el.mara}
                      postId={el._id}
                      userId={el.userId}
                      title={el.title}
                      image={el.image}
                      content={el.content}
                      isOpen={el.isOpen}
                      comment={el.comment}
                      keyword={el.keyword}
                    />
                  </div>
                )
              }
              else {
                return (
                  <div>
                    <PostCase
                      key={idx}
                      sara={el.sara}
                      mara={el.mara}
                      postId={el._id}
                      userId={el.userId}
                      title={el.title}
                      image={el.image}
                      content={el.content}
                      isOpen={el.isOpen}
                      comment={el.comment}
                      keyword={el.keyword}
                    />
                  </div>
                )
              }
            })}
          </div>
        </div>
      <div className={'lp-up-btn'} onClick={scrollToTop}>
        <FontAwesomeIcon icon={faChevronUp} className='fa-2x' />
      </div>
    </div>
  )
}