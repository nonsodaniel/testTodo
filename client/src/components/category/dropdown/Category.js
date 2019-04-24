import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom';

class Category extends Component {

    render() {
        return (
            <ul className="nav flex-column">

                <li className="nav-item" style={{ background: "#f5f5f5" }}>
                    <NavLink to='/add-category'>
                        <a className="nav-link " href="#">
                            <i className="material-icons">note_add</i>
                            <span>Add  Category</span>
                        </a>
                    </NavLink>
                </li>

                <li className="nav-item" style={{ background: "#f5f5f5" }}>
                    <NavLink to='/view-Category'>
                        <a className="nav-link " href="#">
                            <i className="material-icons">note_add</i>
                            <span>View Category</span>
                        </a>
                    </NavLink>
                </li>


            </ul>
        )
    }
}



export default Category
