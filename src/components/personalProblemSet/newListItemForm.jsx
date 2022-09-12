import React from 'react';
import Form from '../form/formComponent';
import './newListItem.scss';

const NewListItemForm = ({ handleChange, handleSubmit, title, link, topic }) => {
    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit} className="form-content">
                <Form name="title" type="text" value={title} className="form-control" id="#title" handleChange={handleChange} required={true} placeholder="Name of the question" />
                <Form name="link" type="text" value={link} className="form-control" id="#link" handleChange={handleChange} required={true} placeholder="Link" />
                <Form name="topic" type="text" value={topic} className="form-control" id="#topic" handleChange={handleChange} required={false} placeholder="Topic" />
                <input type="submit" className="submit-btn" id="#btn" value="Add" />
            </form>
        </div>
    );
};

export default NewListItemForm;