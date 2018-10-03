import React, { Component } from 'react';
import './App.css';

import HomePage from './containers/Home/HomePage';
import ResultsPage from './containers/Results/ResultsPage';
import SearchBar from './components/SearchBar/SearchBar';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
			restaurants: null
		}
	}
	queryRestaurants = (searchText) => {
		console.log('Query restaurants ', searchText);
		if (searchText) {
			fetch(`/restaurants?searchText=${searchText}&pageNumber=${2}&pageSize=${12}`)
				.then(res => res.json())
				.then((data) => {
					this.setState({
						searchText: searchText,
						restaurants: JSON.parse(data)
					})
				})
				.catch(error => console.error(error));
		}
	}
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<div style={{flex: 1}}>
						<img onClick={()=>{this.setState({restaurants: null})}} className="" src="http://restaurants-static.tpco.info.s3-website-us-east-1.amazonaws.com/design-assets/logos/thomas_logo.png"/>
					</div>
					<div style={{flex: 2}}>
					</div>
					<div style={{flex: 3}}>
						{this.state.restaurants ? <SearchBar queryRestaurants={this.queryRestaurants}></SearchBar> : <div></div>}
					</div>
				</header>
				{this.state.restaurants ? <ResultsPage searchText={this.state.searchText} restaurants={this.state.restaurants}></ResultsPage> : <HomePage queryRestaurants={this.queryRestaurants}></HomePage>}
				<footer className="App-footer">
					<div style={{flex: 1}}>
						<img className="" src="http://restaurants-static.tpco.info.s3-website-us-east-1.amazonaws.com/design-assets/logos/thomas_logo.png"/>
					</div>
					<div style={{flex: 5}}>
					</div>
				</footer>
			</div>
		);
	}
}

export default App;
