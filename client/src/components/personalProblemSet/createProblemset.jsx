import React from 'react';
import Form from '../form/formComponent';
import './createProblemset.scss';

export default function CreateProblemset({ handleChange, handleSubmit, name }) {
    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit} className="form-content">
                <Form name="name" value={name} required={true} id="#name" placeholder={"Enter name of your new list"} handleChange={handleChange} />
                <input type="submit" value="Create" className="create-button" />
            </form>
        </div>
    )
}
