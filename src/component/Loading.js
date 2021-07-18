import React from "react";
import logoSquare from "../logo/SalkaMalka_logo_square.png";
import { useSelector } from 'react-redux';

export default function Loading(props) {
  const { isLoading } = useSelector(state => state);
  if (isLoading) 
  return (
    <div id='loading'>
        <img src={logoSquare} alt="loading"/>
        <div>조금만 기다려 주세요! 열심히 로딩중이에요</div>
    </div>
  );
  else return null; 
}