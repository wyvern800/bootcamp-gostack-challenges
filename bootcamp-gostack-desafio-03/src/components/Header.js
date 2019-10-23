import React, { Component } from "react";

// import { Container } from './styles';
import fb_icon from "../assets/fb.png";

class Header extends Component {
  render() {
    return (
      <div class="header">
        <img class="facebook_icon" src={fb_icon} />
      </div>
    );
  }
}

export default Header;
