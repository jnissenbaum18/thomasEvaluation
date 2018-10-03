import React, { Component } from 'react';
import './App.css';

import HomePage from './containers/Home/HomePage';
import ResultsPage from './containers/Results/ResultsPage';
import SearchBar from './components/SearchBar/SearchBar';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
					<div style={{
						display: "flex",
						displayDirection: "row"
					}}>
						<div style={{flex: 1}}>
							<h1 className="App-title">Thomas</h1>
						</div>
						<div style={{flex: 8}}>
							{this.state.restaurants ? <SearchBar queryRestaurants={this.queryRestaurants}></SearchBar> : <div></div>}
						</div>
					</div>
				</header>
				{this.state.restaurants ? <ResultsPage restaurants={this.state.restaurants}></ResultsPage> : <HomePage queryRestaurants={this.queryRestaurants}></HomePage>}
			</div>
		);
	}
}

export default App;
