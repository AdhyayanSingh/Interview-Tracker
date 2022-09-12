import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserSelector } from '../../redux/user/userSelector';
import { connect } from 'react-redux';
import Form from '../form/formComponent';
import { updateDetails, updateProfilePhoto } from '../../api/index';
import { fetchUser } from '../../redux/user/userActions';

import './profileComponent.scss';

function ProfileComponent({ match, user, fetchUser }) {

    const [file, setfile] = useState(null);
    const [email, setemail] = useState('');

    let value = '';

    if (user) {
        value = user.email;
    }

    const handleEmailChange = (e) => {
        setemail(e.target.value);
    }

    const handlePhotoChange = (event) => {
        setfile(event.target.files[0]);
    }

    const handlePhotoSubmit = async (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('photo', file);
        try {
            await updateProfilePhoto(data);
            fetchUser();
            setfile(null);
        } catch (err) {
            alert(err.response.data.message)
        }
    };

    const handleDetailSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDetails({ email });
            fetchUser();
            setemail('');
        } catch (err) {
            alert(err.response?.data.message);
        }
    };

    return (
        <div className="profile">

            <div className="forms">

                <form className="form" onSubmit={handlePhotoSubmit} encType="multipart/form-data">
                    <Form name="updatephoto" type="file" className="form-control" id="photo" handleChange={handlePhotoChange} label="Update Profile Photo" />
                    <button className="" type="submit" disabled={file === null}>Upload</button>
                </form>

                <form className="form" onSubmit={handleDetailSubmit} encType="multipart/form-data">
                    {
                        user ?
                            <Form name="updateemail" value={email} type="email" className="form-control" id="email" handleChange={handleEmailChange} placeholder={value} label="Update Email" />
                            :
                            null
                    }
                    <button className="" type="submit" disabled={email === '' ? true : false}>Update</button>
                </form>

                <div>
                    <Link className="change-password" to={`${match.url}/resetpassword`}>Change Password</Link>
                </div>

            </div>
            <div className="user">
                {
                    user ? <img src={`http://localhost:4000/images/user/${user?.photo}`} className="img" alt="default"></img> : null
                }
                <h4 className="username">{user?.username}</h4>
            </div>

        </div>
    )
}

const mapStateToProps = (state) => ({
    user: getUserSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
    fetchUser: () => dispatch(fetchUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);