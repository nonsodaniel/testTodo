import React, { Component } from 'react';
// import  {BrowserRouter,Switch,  Route } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link" href="ii.html">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="ii.html">Services</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="ii.html">About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="ii.html">Products</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="ii.html">Blog</a>
          </li>
        </ul>
        <span className="copyright ml-auto my-auto mr-2">Copyright © 2019
              <a href="https://designrevision.com" rel="nofollow">__.nonsoDaniel</a>
        </span>
      </footer>
    );
  }
}

export default Footer;
