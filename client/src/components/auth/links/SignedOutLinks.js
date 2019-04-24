import React from 'react'
import {NavLink , Link} from 'react-router-dom';

const SignedOutLinks = () => {
  return (
    <ul className="nav flex-column">
    <li className="nav-item">
                  <NavLink to='/login'>
                <a className="nav-link " href="user-profile-lite.html">
                  <i className="material-icons">person</i>
                  <span>Login</span>
                </a>
                  </NavLink>
              </li>
              <li className="nav-item">
                  <NavLink to='/register'>
                <a className="nav-link " href="user-profile-lite.html">
                  <i className="material-icons">person</i>
                  <span>Registration</span>
                </a>
                  </NavLink>
              </li>
    </ul>
  )
}

export default SignedOutLinks
