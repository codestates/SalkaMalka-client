import React from "react";
import Logo from "./Logo";
import Search from "./Search";
import Profile from "./Profile";

export default function SideBar() {
  const pathName = window.location.pathname

  if (pathName === '/main' || pathName === '/search') {
    return (
      <div className={'side-bar'}>
        <Logo></Logo>
        <Search></Search>
        <Profile></Profile>
      </div>
    )
  }
  else {
    return (
      <div className={'side-bar'}>
        <Logo></Logo>
        <Search></Search>
        <Profile></Profile>
      </div>
    )
  };
};
