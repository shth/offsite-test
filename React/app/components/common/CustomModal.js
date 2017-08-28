import React from 'react'
import {Modal} from 'react-overlays';


const CustomModal = props => (

    <Modal show={props.show} onHide={props.onHide} style={modalStyle}
           backdropStyle={backdropStyle}>
        {props.children}
    </Modal>

)

const modalStyle = {
    position: 'fixed',
    zIndex: 1040,
    top: 0, bottom: 0, left: 0, right: 0
};
const backdropStyle = {
    position: 'fixed',
    top: 0, bottom: 0, left: 0, right: 0,
    zIndex: 'auto',
    backgroundColor: '#000',
    opacity: 0.5
};
const dialogWidth = 400;
const dialogStyle = {
    position: 'absolute',
    width: dialogWidth,
    top: '20%', left: '50%',
    marginLeft: -(dialogWidth / 2),
    border: '1px solid #e5e5e5',
    backgroundColor: 'white',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    padding: 20
}

export {
    CustomModal,
    dialogStyle
}
