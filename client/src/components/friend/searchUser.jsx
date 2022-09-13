import React, { useState } from 'react';
import Form from '../form/formComponent';
import { getFriend } from '../../api/index';
import { useHistory } from 'react-router';

const SearchUser = () => {

    const history = useHistory();
    const [user, setuser] = useState('');

    const handleChange = (e) => {
        setuser(e.target.value);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await getFriend(user);
            if (res.status === 200) {
                console.log(res.config.url);
                history.push(res.config.url);
            }
        } catch (err) {
            alert('User not found')
        }
    }

    return (
        <div className="search-user">
            <form className="search-form-container" onSubmit={handleSubmit}>
                <Form className="search-form" value={user} name="search" type="text" handleChange={handleChange} required={true} />
                <input className="search-submit" type="submit" value="Search" />
            </form>
        </div>
    )
}

export default SearchUser;