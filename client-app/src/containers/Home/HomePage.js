import React, {Component} from 'react';
import {connect} from 'react-redux';

import './HomePage.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import LetterRating from '../../components/LetterRating/LetterRating';

import {
	fetchRestaurants, 
	updateQueryParams
} from '../../redux/actions/actions';

class HomePage extends Component {
    render(){
        return (
            <div className="Home-container">
                <div className="Home-header">
                    <h2 className="Home-header-h2">NYC Restaurants</h2>
                    <SearchBar 
                    searchText={this.props.searchText}
                    updateQuery={this.props.updateQuery} 
                    queryRestaurants={this.props.queryRestaurants}
                    gradeFilter={this.props.gradeFilter}
                    showFilter={true}></SearchBar>
                </div>
                <div className="Home-body">
                    <LetterRating rating="a"></LetterRating>
                    <LetterRating rating="b"></LetterRating>
                    <LetterRating rating="c"></LetterRating>
                    <LetterRating rating="GP"></LetterRating>
                </div>
            </div>
        )
    }
}

const HomeState = (state) => {
    return {
        searchText: state.restaurant.searchText,
        gradeFilter: state.restaurant.gradeFilter
    }
}

const Home = connect(
    HomeState
)(HomePage)

export default Home