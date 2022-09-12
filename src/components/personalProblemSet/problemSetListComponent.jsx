import React, { useState, useEffect } from 'react';
import ListItem from './listItem';
import { addProblems, handleTogglePP } from '../../api/index';
import { connect } from 'react-redux';
import NewListItemForm from './newListItemForm';
import ModalWrapper from '../../components/modal/modal';
import { fetchUser } from '../../redux/user/userActions';

const Modal = ModalWrapper(NewListItemForm);


function ProblemSetListComponent({ playlist, fetchUser }) {

    const [modalShow, setModalShow] = useState(false);
    const [formdata, setformdata] = useState({
        title: '',
        topic: '',
        link: ''
    });

    useEffect(() => {
        setModalShow(false);
    }, [playlist]);

    const handleChange = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setModalShow(false);
            await addProblems(playlist._id, formdata);
            fetchUser();
            setformdata({
                title: '',
                topic: '',
                link: ''
            });

        } catch (err) {
            alert(err.response?.data?.message);
        }
    };

    const handleToggle = async (id) => {
        try {
            await handleTogglePP(id);
            fetchUser();
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="list-item-wrapper">
            <p className="playlist-name">{playlist.name}</p>
            <div className="list-item">
                <table className="list-item-table">
                    <tbody>
                        {
                            playlist?.list?.map((el, i) => (
                                <ListItem key={i} el={el} sid={playlist._id} index={i + 1} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="buttons">
                <div className="add-problem-button-container">
                    {
                        modalShow ? null :
                            <button className="add-problem" onClick={() => setModalShow(true)}>Add Problem</button>
                    }
                    <Modal onHide={() => setModalShow(false)} show={modalShow} handleSubmit={handleSubmit} handleChange={handleChange} {...formdata} />
                </div>
                <div className="toggle-public-container">
                    {
                        playlist.public ?
                            <button className="public-button" onClick={() => handleToggle(playlist._id)}>Public</button> :
                            <button className="private-button" onClick={() => handleToggle(playlist._id)}>Private</button>
                    }
                </div>
            </div>

        </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
    fetchUser: () => dispatch(fetchUser()),
});



export default connect(null, mapDispatchToProps)(ProblemSetListComponent);