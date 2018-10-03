import React, {Component} from 'react';

import './HomePage.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import LetterRating from '../../components/LetterRating/LetterRating';

class Homepage extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="Home-container">
                <div className="Home-header">
                    <h2>NYC Restaurants</h2>
                    <SearchBar queryRestaurants={this.props.queryRestaurants}></SearchBar>
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

export default Homepage