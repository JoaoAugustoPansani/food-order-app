import React from "react";
import ReactDOM  from "react-dom";
 
import classes from './Modal.module.css'

const Backdrop = props => {
    return (
        <div className={classes.backdrop}
        onClick={props.onClose}></div>
    )
};

const Overlay = props => {
    return (
        <div className={classes.modal}>
            <div>{props.children}</div>
        </div>
    )
};

const portalDest = document.getElementById('overlays')

const Modal = props => {

    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClick}/>, portalDest)}
            {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, portalDest)}
        </React.Fragment>
    )
};

export default Modal