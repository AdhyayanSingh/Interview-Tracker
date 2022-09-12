import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import ProblemSetListComponent from './problemSetListComponent';
import ProblemSetItem from './problemSetItem';
import { addList } from '../../api/index';
import CreateProblemset from './createProblemset';
import { fetchUser } from '../../redux/user/userActions';
import ModalWrapper from './../modal/modal';
import { getUserSelector, getUserProblemset } from '../../redux/user/userSelector';

import './personalProblemSet.scss';


const Modal = ModalWrapper(CreateProblemset);

const PersonalProblemSetComponent = ({ user, fetchUser, problemset }) => {

    const loc = useLocation();
    const history = useHistory();
    let val = queryString.parse(loc.search);

    const [modalShow1, setShowModal1] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
    });

    const handleChange = (e) => {
        setFormData({
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const fnd = problemset.find(el => el.name === formData.name);
        if(!fnd){
            try {
                await addList(formData);
                fetchUser();
                setShowModal1((e) => !e);
                setFormData({
                    name: '',
                });
            } catch (err) {
                alert(err.response?.data?.message);
            }
        }else{
            alert(`Name: ${formData.name} already exists`);
        }
        
    }

    const func = (name) => {
        history.push(`${loc.pathname}?name=${name}`)
    };

    let playlist = {};

    if (user) {
        playlist = user.problemsets.find(el => el.name === val.name) || [];
    }
    return (
        <div className="personal-problemset-wrapper">
            <div className="problemset-lists">
                <p className="playlist-heading">My list</p>
                <div className="playlists">
                    <table className="playlist-table">
                        <tbody>
                            {
                                user ?
                                    problemset.map((e, i) => (
                                        <ProblemSetItem key={e._id} func={func} el={e} index={i + 1} />
                                    ))
                                    :
                                    null
                            }
                        </tbody>
                    </table>

                    {modalShow1 ? null : <button onClick={() => setShowModal1(true)} className="add-new-playlist">Add List</button>}
                    <Modal onHide={() => setShowModal1(false)} show={modalShow1} handleSubmit={handleSubmit} handleChange={handleChange} {...formData} />
                </div>
            </div>

            <div className="list-items">
                {(user && val.name) ? <ProblemSetListComponent playlist={playlist} /> : null}
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    user: getUserSelector(state),
    problemset: getUserProblemset(state),
});

const mapDispatchToProps = (dispatch) => ({
    fetchUser: () => dispatch(fetchUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalProblemSetComponent);
