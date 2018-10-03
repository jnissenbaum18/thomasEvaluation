import React, {Component} from 'react';

import SearchBar from '../../components/SearchBar/SearchBar';

class Homepage extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                home
                <SearchBar queryRestaurants={this.props.queryRestaurants}></SearchBar>
            </div>
        )
    }
}

export default Homepage