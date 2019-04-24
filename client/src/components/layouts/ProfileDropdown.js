 import React, {Component} from 'react';

class ProfileDropdown extends Component{
    render(){
        return(
            <div className="dropdown-menu dropdown-menu-small">
                  <a className="dropdown-item" href="user-profile-lite.html">
                    <i className="material-icons">&#xE7FD;</i> Profile</a>
                  <a className="dropdown-item" href="components-blog-posts.html">
                    <i className="material-icons">vertical_split</i> Blog Posts</a>
                  <a className="dropdown-item" href="add-new-post.html">
                    <i className="material-icons">note_add</i> Add New Post</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item text-danger" href="lo.html">
                    <i className="material-icons text-danger">&#xE879;</i> Logout </a>
             </div>
        )
    }
}

export default ProfileDropdown