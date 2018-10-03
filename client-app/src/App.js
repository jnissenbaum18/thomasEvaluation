import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Searchbar from './components/searchbar';

class App extends Component {
  queryRestaurants = (searchText) => {
    console.log('Query restaurants ', searchText);
    if (searchText) {
      fetch(`/restaurants?searchText=${searchText}&pageNumber=${2}&pageSize=${12}`)
      .then(res => res.json())
      .then((data)=>{
        console.log('data: ', data)
      })
      .catch(error => console.error(error));
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">NYC Restaurants</h1>
        </header>
        <Searchbar queryRestaurants={this.queryRestaurants}></Searchbar>
      </div>
    );
  }
}

export default App;
