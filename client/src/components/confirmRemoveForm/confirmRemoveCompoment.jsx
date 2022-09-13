import React from 'react';
import './confirmRemove.scss';

export default function ConfirmRemoveCompoment({ handleDeleteEle, hideModal }) {
    return (
        <div className="remove-component">
            <p className="heading">Are you sure?</p>
            <button className="confirm-yes" onClick={handleDeleteEle}>Yes</button>
            <button className="confirm-no" onClick={hideModal}>No</button>
        </div>
    )
}
