import React, { Component } from "react";

// import { Container } from './styles';
import fb_icon from "../assets/fb.png";

class Header extends Component {
  render() {
    return (
      <div id="header">
        <img id="facebook_icon" src={fb_icon} />
        <div id="my_prof">
          <p id="my_profile">My Profile</p>
        </div>
      </div>
    );
  }
}

export default Header;
