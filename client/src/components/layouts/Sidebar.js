import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Logo from '../../components/style/images/logo-acada-black.svg';
import SignedInLinks from '../auth/links/SignedInLinks'
import SignedOutLinks from '../auth/links/SignedOutLinks'

class Sidebar extends Component {
  state = {
    isLogin: false
  }

  render() {
    let localData = localStorage.getItem("admin");
    let Links = localData ? <SignedInLinks props={this.props} /> : <SignedOutLinks />
    console.log("Links", Links)
    return (
      <div>
        <aside className="main-sidebar col-12 col-md-3 col-lg-2 px-0">
          <div className="main-navbar">
            <nav className="navbar align-items-stretch navbar-light bg-white flex-md-nowrap border-bottom p-0">
              <a className="navbar-brand w-100 mr-0" href="#" style={{ lineHeight: "25px" }}>
                <div className="d-table m-auto">
                  <img id="main-logo" className="d-inline-block align-top mr-1" style={{ maxWidth: "177px" }} src={Logo} alt="Shards Dashboard" />
                </div>
              </a>
              <a className="toggle-sidebar d-sm-inline d-md-none d-lg-none">
                <i className="material-icons">&#xE5C4;</i>
              </a>
            </nav>
          </div>
          <form className="main-sidebar__search w-100 border-right d-sm-flex d-md-none d-lg-none">
            <div className="input-group input-group-seamless ml-3">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="fas fa-search"></i>
                </div>
              </div>
              <input className="navbar-search form-control" type="text" placeholder="Search for something..." aria-label="Search" /> </div>
          </form>
          <div className="nav-wrapper">
            <ul className="nav flex-column">
              <li className="nav-item">
                <NavLink to='/'>
                  <span className="nav-link">
                    <i className="material-icons">list</i>
                    <span> Dashboard</span>
                  </span>
                </NavLink>
              </li>
            </ul>
            {Links}
          </div>
        </aside>
      </div>
    )
  }
}

export default Sidebar
