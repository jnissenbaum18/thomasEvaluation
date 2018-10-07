import React, {Component} from 'react';

import './SearchBar.css';

class SearchBar extends Component {
    updateSearchText = (e) => {
        //Update the searchText query parameter. If there is no character left in the input, 
        //send back searchText: "" to delete last character
        if (!e.target.value) {
            this.props.updateQuery({
                searchText: ""
            });
        }
        this.props.updateQuery({
            searchText: e.target.value
        });
    }
    newRestaurantQuery = async () => {
        //In the case of a use executing a new query through a search, set the search results to 0 first
        await this.props.updateQuery({
            pageNumber: 1
        });
        this.props.queryRestaurants()
    }
    updateFilter = (e) => {
        //Update the filter parameter for the restaurants query
        this.props.updateQuery({
            gradeFilter: e.target.value
        });
    }
    showFilter(){
        //If the searchbar is not on the home page, do not show the filter on it.
        if (this.props.showFilter) {
            return (
                <select className="Drop-down-input" 
                value={this.props.gradeFilter} 
                onChange={e => this.updateFilter(e)}>
                    <option value="All">All</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="Not Yet Graded">Grade Pending</option>                        
                </select>
            )
        } else {
            return
        }
    }
    render(){
        return (
            <div>
                <div className="input-group Input-container">
                    <div className="input-group-prepend">
                    {this.showFilter()}
                    </div>
                    <input 
                        type="text" 
                        value={this.props.searchText} 
                        onChange={e => this.updateSearchText(e)} 
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                this.newRestaurantQuery();
                            }
                        }}
                        className="Text-input" 
                        aria-label="Text input with dropdown button"
                    />
                    <div className="Button-container">
                        <button 
                            className="btn btn-success Button-input" 
                            type="button" 
                            onClick={() => {this.newRestaurantQuery()}}
                        >Search</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBar