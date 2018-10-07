import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';

import HomePage from './containers/Home/HomePage';
import ResultsPage from './containers/Results/ResultsPage';
import SearchBar from './components/SearchBar/SearchBar';
import {
	fetchRestaurants, 
	updateQueryParams,
	setHomeView,
	setResultsView
} from './redux/actions';

class AppComponent extends Component {
	queryRestaurants = () => {
		console.log('Query restaurants ', this.props);
		if (this.props.searchText) {
			this.props.getRestaurants({
				searchText: this.props.searchText,
				pageNumber: this.props.pageNumber,
				pageSize: this.props.pageSize,
				gradeFilter: this.props.gradeFilter
			});
		}
	}
	updateQuery = (...queryParams) => {
		this.props.setQuery(queryParams)
	}
	setComponentBody = () => {
		switch (this.props.view) {
			case ("Home"): {
				return (
					<HomePage 
						searchText={this.props.searchText}
						updateQuery={this.updateQuery} 
						queryRestaurants={this.queryRestaurants}
						gradeFilter={this.props.gradeFilter}>
					</HomePage>
				)
			}
			case ("Results"): {
				return (
					<ResultsPage 
						searchText={this.props.searchText} 
						restaurants={this.props.restaurants} 
						count={this.props.count}
						pageNumber={this.props.pageNumber}
						gradeFilter={this.props.gradeFilter}
						moneyFilter={this.props.moneyFilter}
						updateQuery={this.updateQuery} 
						queryRestaurants={this.queryRestaurants}>
					</ResultsPage>
				)
			}
			default:
				return (
					<HomePage 
						searchText={this.props.searchText}
						updateQuery={this.updateQuery} 
						queryRestaurants={this.queryRestaurants}
						gradeFilter={this.props.gradeFilter}>
					</HomePage>
				)
		}
	}
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<div style={{flex: 1}}>
						<img onClick={()=>{this.props.setHomeView()}} className="" alt="thomas" style={{height: "43px"}} src="http://restaurants-static.tpco.info.s3-website-us-east-1.amazonaws.com/design-assets/logos/thomas_logo.png"/>
					</div>
					<div style={{flex: 2}}>
					</div>
					<div style={{flex: 3}}>
						{this.props.view === "Results" ? 
						<SearchBar 
							searchText={this.props.searchText}
							updateQuery={this.updateQuery} 
							queryRestaurants={this.queryRestaurants}
							gradeFilter={this.props.gradeFilter}
							showFilter={false}>
						</SearchBar> : <div></div>}
					</div>
				</header>
				{this.setComponentBody()}
				<footer className="App-footer">
					<div style={{flex: 1}}>
						<img className="" alt="thomas" style={{height: "43px"}} src="http://restaurants-static.tpco.info.s3-website-us-east-1.amazonaws.com/design-assets/logos/thomas_logo.png"/>
					</div>
					<div style={{flex: 5}}>
					</div>
				</footer>
			</div>
		);
	}
}

const AppState = (state) => {
	return {
		restaurants: state.restaurant.list,
		count: state.restaurant.count,
		searchText: state.restaurant.searchText,
		gradeFilter: state.restaurant.gradeFilter,
		pageNumber: state.restaurant.pageNumber,
		pageSize: state.restaurant.pageSize,
		view: state.appState.view
	}
}

const AppDispatch = (dispatch) => {
	return {
		getRestaurants: (queryParams) => {
			dispatch(fetchRestaurants(queryParams));
		},
		setQuery: (queryParams) => {
			dispatch(updateQueryParams(queryParams))
		},
		setHomeView: () => {
			dispatch(setHomeView())
		},
		setResultsView: () => {
			dispatch(setResultsView())
		}
	}
};

const App = connect(
	AppState, AppDispatch
)(AppComponent);

export default App;
