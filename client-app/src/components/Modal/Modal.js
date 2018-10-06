import React, {Component} from 'react';

import "./Modal.css";
import LetterRating from "../LetterRating/LetterRating";

class Modal extends Component {
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
        const {show, handleClose, children, rst} = this.props;
        const showHideClass = show ? "Modal-container display-block" : "Modal-container display-none"
        return (
            <div className={showHideClass}>
                <section className="Modal-main">
                    <button className="Modal-close" onClick={handleClose}>close</button>
                    <div className="Modal-letter-rating">
                        <LetterRating rating={this.getGrade(rst.grade)}></LetterRating>
                    </div>
                    <img className="card-img-top Modal-img" alt="restaurant" src={rst.imageUrl}/>
                    {children}
                    
                </section>
            </div>
        )
    }
}

export default Modal