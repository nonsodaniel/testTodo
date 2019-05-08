import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ShoppingList from './components/ShoppingList'

import NavBar from './components/NavBar'
 
class App extends Component {
  render() {
    return (
        <div className="app" style={{color: "white"}}>
             <NavBar />
             <ShoppingList />
        </div>
     
    );
  }
}

export default App;
