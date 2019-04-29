import React, { Component } from 'react'
import Dp from '../style/images/admin_dp.png'
import ProfileDropdown from '../../components/layouts/ProfileDropdown'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  state = {
    showProfileDrp: false
  }

  render() {

    let isDev = /localhost/.test(window.location.origin);
    console.log("isdev", isDev)
    let base_url = isDev ? "http://localhost:4000/" : "https://acadanews.herokuapp.com/"

    let admin_name = JSON.parse(localStorage.getItem("admin")) ? JSON.parse(localStorage.getItem("admin")).admin : null
    let local = JSON.parse(localStorage.getItem("admin")) ? JSON.parse(localStorage.getItem("admin")).admin.admin_dp : null
    let dp = local ? `${base_url}${local}` : Dp;
    console.log("love", admin_name)
    return (
      <div className="main-navbar sticky-top bg-white">
        {/* <!-- Main Navbar --> */}
        <nav className="navbar align-items-stretch navbar-light flex-md-nowrap p-0">
          <form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
            <div className="input-group input-group-seamless ml-3">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="fas fa-search"></i>
                </div>
              </div>
              <input className="navbar-search form-control" type="text" placeholder="Search for something..." aria-label="Search" /> </div>
          </form>
          <ul className="navbar-nav border-left flex-row ">


            <li className="nav-item border-right dropdown notifications">
              <a className="nav-link nav-link-icon text-center" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img className="user-avatar rounded-circle mr-2" src={dp} alt="User Avatar" style={{ height: "42px" }} />
                {/* <span className="d-none d-md-inline-block">Nonso Daniel</span> */}
              </a>
              <div className="dropdown-menu dropdown-menu-small" aria-labelledby="dropdownMenuLink">
                <a className="dropdown-item" href="#">
                  <div className="notification__icon-wrapper">
                    <div className="notification__icon">
                      {/* <i className="material-icons">&#xE6E1;</i> */}
                      <img className="user-avatar rounded-circle mr-2" src={dp} alt="User Avatar" style={{ height: "42px" }} />
                    </div>
                  </div>
                  <Link to="/admin-profile">
                    <div className="notification__content">
                      <span className="notification__category" style={{ fontSize: "14px", fontWeight: "600" }}>{admin_name.firstname + " " + admin_name.othernames}</span>
                    </div>
                  </Link>
                </a>
                <a className="dropdown-item" href="#">
                  <div className="notification__icon-wrapper">
                    <div className="notification__icon">
                      <i className="material-icons">&#xE8D1;</i>
                    </div>
                  </div>
                  <div className="notification__content">
                    <span className="notification__category">Coming details</span>
                  </div>
                </a>
                <a className="dropdown-item notification__all text-center" href="#"> View all Notifications </a>
              </div>
            </li>
            {/* <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-nowrap px-3" >
                    <img className="user-avatar rounded-circle mr-2" src={Dp} alt="User Avatar" />
                    <span className="d-none d-md-inline-block">Nonso Daniel</span>
                  </a>
                  {showProfileDrp}
                </li> */}
          </ul>
          <nav className="nav">
            <a href="#" className="nav-link nav-link-icon toggle-sidebar d-md-inline d-lg-none text-center border-left" data-toggle="collapse" data-target=".header-navbar" aria-expanded="false" aria-controls="header-navbar">
              <i className="material-icons">&#xE5D2;</i>
            </a>
          </nav>
        </nav>
      </div>

    )
  }
}

export default Navbar
