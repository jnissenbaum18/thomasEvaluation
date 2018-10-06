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
			restaurants: null,
			count: 0,
			pageNumber: 1,
			pageSize: 12,
			gradeFilter: "All",
			moneyFilter: "All"
		}
	}
	queryRestaurants = () => {
		console.log('Query restaurants ', this.state);
		if (this.state.searchText) {
			fetch(`/restaurants?
			searchText="${this.state.searchText}"&
			pageNumber=${this.state.pageNumber}&
			pageSize=${this.state.pageSize}&
			gradeFilter=${this.state.gradeFilter}`)
				.then(res => res.json())
				.then((data) => {
					const parsedData = JSON.parse(data)
					this.setState({
						restaurants: parsedData.restaurants,
						count: parsedData.count
					})
				})
				.catch(error => console.error(error));
		}
	}
	updateQuery = (searchText, pageNumber, pageSize) => {
		let updateState = {};
		if (searchText) {
			updateState.searchText = searchText;
		} else {
			//updateState.searchText = "";
		}
		if (pageNumber) {
			updateState.pageNumber = pageNumber;
		}
		if (pageSize) {
			updateState.pageSize = pageSize;
		}
		this.setState(updateState);
	}
	updateFilter = (gradeFilter, moneyFilter) => {
		let updateState = {};
		if (gradeFilter) {
			updateState.gradeFilter = gradeFilter;
		}
		if (moneyFilter) {
			updateState.moneyFilter = moneyFilter;
		}
		console.log(updateState)
		this.setState(updateState);
	}
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<div style={{flex: 1}}>
						<img onClick={()=>{this.setState({restaurants: null})}} className="" alt="thomas" src="http://restaurants-static.tpco.info.s3-website-us-east-1.amazonaws.com/design-assets/logos/thomas_logo.png"/>
					</div>
					<div style={{flex: 2}}>
					</div>
					<div style={{flex: 3}}>
						{this.state.restaurants ? 
						<SearchBar 
							searchText={this.state.searchText}
							updateQuery={this.updateQuery} 
							updateFilter={this.updateFilter} 
							queryRestaurants={this.queryRestaurants}
							gradeFilter={this.state.gradeFilter}
							showFilter={false}>
						</SearchBar> : <div></div>}
					</div>
				</header>
				{this.state.restaurants ? <ResultsPage 
					searchText={this.state.searchText} 
					restaurants={this.state.restaurants} 
					count={this.state.count}
					pageNumber={this.state.pageNumber}
					gradeFilter={this.state.gradeFilter}
					moneyFilter={this.state.moneyFilter}
					updateQuery={this.updateQuery} 
					updateFilter={this.updateFilter}
					queryRestaurants={this.queryRestaurants}>
				</ResultsPage> : <HomePage 
					searchText={this.state.searchText}
					updateQuery={this.updateQuery} 
					updateFilter={this.updateFilter} 
					queryRestaurants={this.queryRestaurants}
					gradeFilter={this.state.gradeFilter}>
				</HomePage>}
				<footer className="App-footer">
					<div style={{flex: 1}}>
						<img className="" alt="thomas" src="http://restaurants-static.tpco.info.s3-website-us-east-1.amazonaws.com/design-assets/logos/thomas_logo.png"/>
					</div>
					<div style={{flex: 5}}>
					</div>
				</footer>
			</div>
		);
	}
}

export default App;
