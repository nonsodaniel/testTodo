import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom';

class RoleDropdown extends Component {

    render() {
        return (
            <ul className="nav flex-column">

                <li className="nav-item" style={{ background: "#f5f5f5" }}>
                    <NavLink to='/add-admin'>
                        <a className="nav-link " href="#">
                            <i className="material-icons">note_add</i>
                            <span>Add  Admin</span>
                        </a>
                    </NavLink>
                </li>

                <li className="nav-item" style={{ background: "#f5f5f5" }}>
                    <NavLink to='/view-admins'>
                        <a className="nav-link " href="#">
                            <i className="material-icons">note_add</i>
                            <span>View Admins</span>
                        </a>
                    </NavLink>
                </li>

                <li className="nav-item" style={{ background: "#f5f5f5" }}>
                    <NavLink to='/add-user'>
                        <a className="nav-link " href="#">
                            <i className="material-icons">note_add</i>
                            <span>Add User</span>
                        </a>
                    </NavLink>
                </li>

                <li className="nav-item" style={{ background: "#f5f5f5" }}>
                    <NavLink to='/view-users'>
                        <a className="nav-link " href="#">
                            <i className="material-icons">note_add</i>
                            <span>View Users</span>
                        </a>
                    </NavLink>
                </li>


            </ul>
        )
    }
}



export default RoleDropdown
