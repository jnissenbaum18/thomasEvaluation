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
        const {rst, children} = this.props;
        return (
            <div className="card Quick-card">
                <div className="Quick-card-letter-rating">
                    <LetterRating rating={this.getGrade(rst.grade)}></LetterRating>
                </div>
                <img className="card-img-top Quick-card-img" alt="restaurant" src={rst.imageUrl}/>
                <div className="card-body">
                    {children}
                </div>
            </div>
        )
    }
}

export default QuickCard