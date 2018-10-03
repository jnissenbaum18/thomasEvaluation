import React, {Component} from 'react';

import './ResultsPage.css';
import QuickCard from '../../components/QuickCard/QuickCard';

class ResultsPage extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const {restaurants} = this.props;
        return (
            <div className="Results-container">
                <div className="Results-header">
                    <p>Search:</p>
                    <p>{this.props.searchText}</p>
                </div>
                <div className="Quick-card-row">
                    {restaurants.map((rst, i) => {
                        console.log(rst)
                        return (
                            <div key={i} className="Quick-card-container">
                                <QuickCard rst={rst}></QuickCard>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default ResultsPage