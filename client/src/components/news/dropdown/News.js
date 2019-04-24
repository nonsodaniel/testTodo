import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom';

class News extends Component {

    render() {
        return (
            <ul className="nav flex-column">

                <li className="nav-item" style={{ background: "#f5f5f5" }}>
                    <NavLink to='/add-news'>
                        <a className="nav-link " href="#">
                            <i className="material-icons">note_add</i>
                            <span>Add  News</span>
                        </a>
                    </NavLink>
                </li>

                <li className="nav-item" style={{ background: "#f5f5f5" }}>
                    <NavLink to='/view-news'>
                        <a className="nav-link " href="#">
                            <i className="material-icons">note_add</i>
                            <span>View News</span>
                        </a>
                    </NavLink>
                </li>


            </ul>
        )
    }
}



export default News
