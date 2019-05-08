import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ShoppingList from './components/ShoppingList'

import NavBar from './components/NavBar'

import { Provider } from 'react-redux';
import store from './store'
import uuid from 'uuid';

class App extends Component {

  state = {
    people : [
      {uuid: uuid(), name: "Egg"},
      {uuid: uuid(), name: "Meat"},
      {uuid: uuid(), name: "Plantain"},
      {uuid: uuid(), name: "Moi Moi"},
      {uuid: uuid(), name: "Akara"},
  ]
  }

  render() {
    return (
      <Provider store={store} data = {this.state.people}>
        <div className="app" style={{color: "white"}}>
             <NavBar />
             <ShoppingList />
        </div>
      </Provider>
        
     
    );
  }
}

export default App;
