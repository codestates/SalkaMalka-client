import React from "react";
import { useHistory } from "react-router-dom";
import logoCrop from "../logo/SalkaMalka_logo_crop.png";
import logoSquare from "../logo/SalkaMalka_logo_square.png";

export default function Logo(props) {
  const history = useHistory();
  const pathName = window.location.pathname;
  const backToHome = () => {
    history.push('/main?sort=date');
  }
  if (pathName === '/main') {
    return (
      <img id='logo-crop' src={logoCrop} alt="logo" onClick={() => backToHome()}/>
    )
  } else {
    return (
      <img id='logo-square' src={logoSquare} alt="logo" onClick={() => backToHome()}/>
    ) 
  }
}