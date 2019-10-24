import React, { Component } from "react";

// import { Container } from './styles';
import fb_icon from "../assets/fb.png";

class Header extends Component {
  render() {
    return (
      <header id="main-header">
        <div className="content">
          <img className="fb_icon" src={fb_icon} />
          <a className="proflink" href="#">
            My Profile
          </a>
        </div>
      </header>
    );
  }
}

export default Header;
