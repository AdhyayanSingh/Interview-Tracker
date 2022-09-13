import React, { useState } from 'react';
import Form from '../form/formComponent';
import { useHistory, useLocation } from 'react-router-dom';
import { forgotPassword } from '../../api/index';

import './forgotPassword.scss';

export default function ForgotPassword() {

    const history = useHistory();
    const location = useLocation();
    const [state, setState] = useState(false);

    const [data, setData] = useState({
        email: ''
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setState(e => !e);
        try {
            await forgotPassword(data);
            history.push(`${location.pathname}/done`);
        } catch (err) {
            setState(e => !e);
            alert(err.message);
        }

    };

    return (
        <div className="forgot-password">
            {
                state ?
                    <h4 className="">Email is being sent, please wait...</h4> :
                    <div>
                        <h3 className="m-auto">Password Reset</h3>
                        <div className="form">
                            <form onSubmit={handleSubmit}>
                                <Form name="email" type="email" value={data.email} id="#email" required={true} handleChange={handleChange} label="Email" />
                                <button className="button" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
            }

        </div>
    )
}
