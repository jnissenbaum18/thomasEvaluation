import React, {Component} from 'react';

class Searchbar extends Component {
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
                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</button>
                        <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                        <div role="separator" className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">Separated link</a>
                        </div>
                    </div>
                    <input type="text" value={this.state.searchText} onChange={e => this.updateSearchText(e)} className="form-control" aria-label="Text input with dropdown button"/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={() => {this.props.queryRestaurants(this.state.searchText)}}>Search</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Searchbar