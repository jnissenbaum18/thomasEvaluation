import React, {Component} from 'react';

import './QuickCard.css';
import LetterRating from '../LetterRating/LetterRating';

class QuickCard extends Component {
    getGrade(grade) {
        const Grades = {
            A: "a",
            B: "b",
            C: "c",
            "Not Yet Graded": "GP"
        }
        return Grades[grade]
    }
    render(){
        const {rst} = this.props;
        return (
            <div className="card Quick-card">
                <div className="Letter-rating-card-container">
                    <LetterRating rating={this.getGrade(rst.grade)}></LetterRating>
                </div>
                <img className="card-img-top Quick-card-img" alt="restaurant" src={rst.imageUrl}/>
                <div className="card-body">
                    <p className="Quick-card-title" style={{color: "#1c5b7b", fontWeight: 700}}>{rst.name}</p>
                    <p className="Quick-card-cuisine" style={{color: "#a6a8a9"}}>{rst.cuisine} {}</p>
                    <p className="Quick-card-text" style={{color: "#767676"}}>{rst.building} {rst.street}, {rst.boro}, NY {rst.zipcode}</p>
                    <p className="Quick-card-text" style={{color: "#767676"}}>{rst.phone}</p>
                </div>
            </div>
        )
    }
}

export default QuickCard