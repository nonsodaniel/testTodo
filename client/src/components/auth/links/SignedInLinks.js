import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom';
import MaterialIcon, { colorPalette } from 'material-icons-react';
import Swal from 'sweetalert2';
import NewsDropdown from '../../news/dropdown/News'
import CategoryDropdown from '../../category/dropdown/Category'
import RoleDropdown from '../../role/dropdown/RoleDropdown'
import { withRouter } from 'react-router-dom';


class SignedInLinks extends Component {

  state = {
    isNews: false, isCategory: false, isRole: false, redirect: false
  }

  clickNews = (e) => {
    e.preventDefault()
    this.setState({ isNews: true })
    // console.log("News state", this.state)
    if (this.state.isNews) {
      this.setState({ isNews: false })
    } else {
      this.setState({ isNews: true })
    }
  }
  clickCategory = (e) => {
    e.preventDefault()
    this.setState({ isCategory: true })
    // console.log("News state", this.state)
    if (this.state.isCategory) {
      this.setState({ isCategory: false })
    } else {
      this.setState({ isCategory: true })
    }
  }

  clickRole = (e) => {
    e.preventDefault();
    console.log(this.state.isRole)
    this.setState({ isRole: true });

    if (this.state.isRole) {
      this.setState({ isRole: false });
    } else {
      this.setState({ isRole: true });
    }

  }

  handleLogOut = (e) => {
    e.preventDefault();
    this.props.signOut();
    console.log("this is props", this.props)
    console.log(this.props)
    var local = localStorage.getItem('admin');
    if (!local) {
      console.log(this.props)
      this.props.history.push('/')
    }
  }



  render() {
    let state = this.state;
    let local = localStorage.getItem("admin");
    let newsLink = state.isNews ? <NewsDropdown /> : null
    let catLink = state.isCategory ? <CategoryDropdown /> : null
    let roleLink = state.isRole ? <RoleDropdown /> : null;
    return (
      <ul className="nav flex-column">

        <li className="nav-item" onClick={this.clickNews}>
          <a className="nav-link " href="">
            <i className="material-icons">event_note</i>
            <span> News</span>
          </a>
        </li>
        {newsLink}



        <li className="nav-item" onClick={this.clickCategory}>
          <a className="nav-link " href="">
            <i className="material-icons">storage</i>
            <span>Category</span>
          </a>
          {catLink}
        </li>

        <li className="nav-item" onClick={this.clickRole}>
          <a className="nav-link " href="">
            <i className="material-icons">storage</i>
            <span>Role</span>
          </a>
          {roleLink}
        </li>


        <li className="nav-item" onClick={this.handleLogOut}>
          <a className="nav-link " href="">
            <i className="material-icons" style={{ color: "red" }}>settings_power</i>
            {/* <MaterialIcon icon="dashboard" /> */}
            <span>Logout</span>
          </a>
        </li>

      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  const { authMessage, registerData, status } = state.auth;
  return {
    authMessage,
    registerData,
    status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignedInLinks))
