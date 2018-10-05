import React, {Component} from 'react';

import "./Modal.css";

class Modal extends Component {
    render(){
        const {show, handleClose, children} = this.props;
        const showHideClass = show ? "Modal-container display-block" : "Modal-container display-none"
        return (
            <div className={showHideClass}>
                <section className="Modal-main">
                    {children}
                    <button onClick={handleClose}>close</button>
                </section>
            </div>
        )
    }
}

export default Modal