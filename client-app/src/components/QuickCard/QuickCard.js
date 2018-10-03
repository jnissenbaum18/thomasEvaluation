import React, {Component} from 'react';

import './QuickCard.css';

class QuickCard extends Component {
    render(){
        const {rst} = this.props;
        return (
            <div className="card Quick-card">
                <img className="card-img-top Quick-card-img" src={rst.imageUrl}/>
                <div className="card-body">
                    <p className="Quick-card-title">{rst.name}</p>
                    <p className="Quick-card-cuisine">{rst.cuisine}</p>
                    <p className="Quick-card-text">{rst.building} {rst.street}, {rst.boro}, NY {rst.zipcode}</p>
                    <p className="Quick-card-text">{rst.phone}</p>
                </div>
            </div>
        )
    }
}

export default QuickCard