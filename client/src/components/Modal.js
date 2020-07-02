import React, { Fragment } from 'react';
import { APP_NAME } from '../constants';
const Modal = ({ children, closeModal, isOpen, title}) => {
  return ( 
    <Fragment>
      <div className={`modal ${isOpen? 'show' : ''}`}>
        <div className="modal-container">
          <span className="modal-close fa fa-close" onClick={() => closeModal()}></span>
          <div className="modal-header">
            <h1> { title ? title : APP_NAME} </h1>
          </div>
          <div className="modal-body">
            {
              children ? children : null
            }
          </div>
          {/* <div className="modal-footer">
            <h3> i am footer</h3>
          </div> */}
        </div>
      </div>
    </Fragment>
   );
}
 
export default Modal;