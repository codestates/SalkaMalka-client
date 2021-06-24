import React, { Component } from "react";
import SideBar from "../component/SideBar";

class WritePage extends Component {
  constructor(props) {
    super(props)
  };
  render() {
    return (
      <SideBar isSignIn={this.props.isSignIn} signIn={this.props.signIn} signOut={this.props.signOut} signUp={this.props.signUp}></SideBar>
    )
  }
}

export default WritePage;