import React, { useState } from "react";
import { useHistory } from "react-router";
import { setQueryString, setAlertOpen } from '../actions/index'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
require("dotenv").config();

export default function Search() {
  const { email, userId } = useSelector(state => state);
  const pathName = window.location.pathname;
  const dispatch = useDispatch();
  const history = useHistory();

  function handleSearch(e) {
    const queryString = document.querySelector('#search-input').value
    if (!queryString.length) {
      dispatch(setAlertOpen(true, '검색어를 입력해주세요.'))
      return;
    }
    const encoded = encodeURI(encodeURIComponent(queryString));
    dispatch(setQueryString(queryString));
    history.push(`/search?q=${encoded}`);
  }

  if (pathName === '/main' || pathName === '/search') {
    return (
      <div className='search-bar'>
        <input id="search-input" type="text" />
        <FontAwesomeIcon icon={faSearch} onClick={handleSearch} />
      </div>
    )
  } else if (pathName === `/users/${userId}`) {
    return (
      <div className='search-bar'>
        <div id='hello-msg'>{`${email}님, 안녕하세요?`}</div>
      </div>
    )
  } else {
    return (
      <div className='search-bar hidden'>
        <input id="search-input" type="text" />
        <FontAwesomeIcon icon={faSearch} onClick={handleSearch} />
      </div>
    )
  }
}
