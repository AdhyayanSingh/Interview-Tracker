import React, { useState } from 'react';
import Form from '../form/formComponent';
import { useParams, useHistory } from 'react-router-dom';
import { resetPassword, changePassword } from '../../api/index.js';

import './resetPassword.scss'

export default function ResetPassword() {
    const { token } = useParams();
    const history = useHistory();

    const [state, setstate] = useState({
        newPassword: '',
        confirmNP: '',
        currPassword: ''
    });

    const handleChange = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await resetPassword(token, state);
            history.push('/login');
            console.log(res);
        } catch {
            alert('Something Went Wrong!');
        }
    };

    const handleSubmit1 = async (e) => {
        e.preventDefault();
        try {
            const res = await changePassword(state);
            console.log(res);
            history.push('/');
        } catch (err) {
            alert(err.message);
        }
    }

    return (

        <div className="reset-password">

            {
                token ?
                    <form className="m-auto form-class" onSubmit={handleSubmit} >
                        <Form name="newPassword" value={state.newPassword} type="password" id="#password" required={true} handleChange={handleChange} label="New Password" />
                        <Form name="confirmNP" value={state.confirmNP} type="password" id="#confirmPassword" required={true} handleChange={handleChange} label="Confirm Password" />
                        <button className="button" type="submit">Submit</button>
                    </form>
                    :
                    <form className="m-auto form-class" onSubmit={handleSubmit1} >
                        <Form name="currPassword" value={state.currPassword} type="password" id="#currPassword" required={true} handleChange={handleChange} label="Current Password" />
                        <Form name="newPassword" value={state.newPassword} type="password" id="#password" required={true} handleChange={handleChange} label="New Password" />
                        <Form name="confirmNP" value={state.confirmNP} type="password" id="#confirmPassword" required={true} handleChange={handleChange} label="Confirm Password" />
                        <button className="button" type="submit">Submit</button>
                    </form>
            }
        </div>
    )
}
