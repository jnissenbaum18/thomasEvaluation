import React, {Component} from 'react';

class SearchBar extends Component {
    updateSearchText = (e) => {
        this.props.updateQuery({
            searchText: e.target.value
        });
    }
    updateFilter = (e) => {
        this.props.updateQuery({
            gradeFilter: e.target.value
        });
    }
    showFilter(){
        if (this.props.showFilter) {
            return (
                <select className="form-control" 
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
                <div className="input-group">
                    <div className="input-group-prepend">
                    {this.showFilter()}
                    </div>
                    <input 
                        type="text" 
                        value={this.props.searchText} 
                        onChange={e => this.updateSearchText(e)} 
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                this.props.queryRestaurants();
                            }
                        }}
                        className="form-control" 
                        aria-label="Text input with dropdown button"
                    />
                    <div className="input-group-append">
                        <button 
                            className="btn btn-success" 
                            type="button" 
                            onClick={() => {this.props.queryRestaurants()}}
                        >Search</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBar