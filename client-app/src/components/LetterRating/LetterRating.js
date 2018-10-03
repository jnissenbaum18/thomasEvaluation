import React, {Component} from 'react';

import './LetterRating.css';

class LetterRating extends Component {
    render () {
        const {rating} = this.props;
        return (
            <div className="Letter-rating-container">
                <img className="NY-seal" src={`http://restaurants-static.tpco.info.s3-website-us-east-1.amazonaws.com/design-assets/seals/Seal_of_New_York_City_BW.png`}/>
                <img className={`${rating == "GP" ? "Letter-GP" : "Letter"}`} src={`http://restaurants-static.tpco.info.s3-website-us-east-1.amazonaws.com/design-assets/letters/${rating}.png`}/>
            </div>
        )
    }
}

export default LetterRating