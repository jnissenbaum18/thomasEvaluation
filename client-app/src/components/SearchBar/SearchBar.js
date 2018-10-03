import React, {Component} from 'react';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchText: ""
        }
    }
    updateSearchText = (e) => {
        this.setState({
            searchText: e.target.value
        });
    }
    render(){
        return (
            <div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                    <select className="form-control">
                        <option>All</option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                        <option>Grade Pending</option>                        
                    </select>
                    </div>
                    <input 
                        type="text" 
                        value={this.state.searchText} 
                        onChange={e => this.updateSearchText(e)} 
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                this.props.queryRestaurants(this.state.searchText);
                            }
                        }}
                        className="form-control" 
                        aria-label="Text input with dropdown button"
                    />
                    <div className="input-group-append">
                        <button 
                            className="btn btn-outline-secondary" 
                            type="button" 
                            onClick={() => {this.props.queryRestaurants(this.state.searchText)}}
                        >Search</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBar