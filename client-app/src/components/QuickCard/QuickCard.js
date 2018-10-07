import React, {Component} from 'react';

import './QuickCard.css';
import LetterRating from '../LetterRating/LetterRating';

class QuickCard extends Component {
    getGrade(grade) {
        //Convert the database grade entries to the image url entry
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
        const rstGradeDate = new Date(rst.gradeDate);
        return (
            <div className="card Quick-card">
                <div className="Quick-card-letter-rating">
                    <LetterRating rating={this.getGrade(rst.grade)}></LetterRating>
                    <div className="Quick-card-date">{rstGradeDate.getMonth() + 1} &#183; {rstGradeDate.getDate()} &#183; {rstGradeDate.getFullYear()}</div>
                </div>
                <img className="card-img-top Quick-card-img" alt="restaurant" src={rst.imageUrl}/>
                <div className="card-body pre-scrollable">
                    {children}
                </div>
            </div>
        )
    }
}

export default QuickCard