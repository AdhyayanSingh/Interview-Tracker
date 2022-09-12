import React, { useState, useEffect } from 'react';
import ObjectProblemsetList from './objectProblemsetList';
import { getUserSelector } from '../../redux/user/userSelector';
import { connect } from 'react-redux';
import { removeFriend, addFriend, cancelRequest, handleRequest } from '../../api/index';
import { fetchUser } from '../../redux/user/userActions';
import { object } from '../../redux/object/objectSelector';
import { fetchObject } from '../../redux/object/objectAction';
import { useHistory, useLocation } from 'react-router-dom';
import ConfirmRemoveCompoment from '../confirmRemoveForm/confirmRemoveCompoment';
import ModalWrapper from '../modal/modal';
import queryString from 'query-string';
import ObjectProblemsetListItem from './objectProblemsetListItem';
import { baseURI } from '../../api/index';

import './objectAction.scss';

const Modal = ModalWrapper(ConfirmRemoveCompoment);

const ObjectActionComponent = ({ object, user, fetchUser, fetchObject }) => {

    const history = useHistory();
    const loc = useLocation();
    const value = queryString.parse(loc.search);

    const [show, setModal] = useState(false);

    const hideModal = () => {
        setModal(false);
    }


    if (user?.username === object?.username && user !== undefined) {
        history.push(`/${user.username}/profile`);
    }

    const [isFriend, setIsFriend] = useState(0);

    useEffect(() => {
        const state1 = user?.friends?.find(el => el.username === object.username);
        const state2 = object?.friendRequests.find(el => el.username === user?.username);
        const state3 = user?.friendRequests.find(el => el.username === object?.username);
        state1 ? setIsFriend(2) : (state2 ? setIsFriend(1) : (state3 ? setIsFriend(3) : setIsFriend(0)));
    }, [user, object]);

    const handleRemoveFriend = async () => {
        try {
            await removeFriend(object?._id);
            fetchUser();
            fetchObject(object?.username);
            hideModal();
        } catch (err) {
            alert(err.response.data.message);
        }
    }

    const handleAddFriend = async () => {
        try {
            await addFriend(object?._id);
            fetchUser();
            fetchObject(object?.username);
        } catch (err) {
            alert(err.response.data.message);
        }
    }

    const handleCancelRequest = async () => {
        try {
            const res = await cancelRequest(object?._id);
            console.log(res.data);
            fetchObject(object?.username);
        } catch (err) {
            alert(err.response.data.message);
        }
    }

    const handleAccept = async () => {
        try {
            const res = await handleRequest(object?._id, { action: 'accept' });
            fetchUser();
            fetchObject(object?.username);
            console.log(res);
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    const handleReject = async () => {
        try {
            const res = await handleRequest(object?._id, { action: 'reject' });
            fetchUser();
            fetchObject(object?.username);
            console.log(res);
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    const func = (name) => {
        history.push(`${loc.pathname}?problemset=${name}`)
    }

    let { username, problemsets, photo } = object;
    problemsets = problemsets.filter(el => el.public === true);
    console.log(problemsets);
    const particularProblemset = problemsets.find(el => el.name === value.problemset);
    return (
        <div>
            {object ?
                <div className="object-detail-wrapper">
                    <div className="object-details">
                        <div className="detail-component">
                            <img className="object-image" src={`${baseURI}/images/user/${photo}`} alt={username}></img><br />
                            <p className="object-username">{username}</p>
                            {
                                isFriend === 0 ?
                                    <button className="confirm-yes" onClick={handleAddFriend} >Add Friend</button>
                                    :
                                    (isFriend === 1 ? <button onClick={handleCancelRequest} className="confirm-no">Cancel Request</button>
                                        :
                                        (isFriend === 2 ? <button className="confirm-no" onClick={() => setModal(true)}>Remove Friend</button>
                                            :
                                            <div>
                                                <button className="confirm-accept" onClick={handleAccept}>Accept</button>
                                                <button className="confirm-reject" onClick={handleReject}>Reject</button>
                                            </div>))
                            }
                        </div>
                        {
                            show ? <Modal onHide={hideModal} show={show} handleDeleteEle={handleRemoveFriend} hideModal={hideModal} /> : null
                        }
                    </div>

                    <div className="object-problemset-wrapper">
                        <div className="object-problemset">
                            <div className="problemset-container">
                                <p className="object-problemset-heading">{`${username}'s problemset`}</p>
                                {
                                    problemsets.length > 0 ?
                                        <table className="object-problemset-table">
                                            <tbody>
                                                {
                                                    problemsets.map((el, i) =>
                                                        <ObjectProblemsetList key={el._id} list={el} index={i + 1} func={func} />
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                        :
                                        <p className="empty">No public lists to display.</p>
                                }
                            </div>
                        </div>
                        {
                            value.problemset ? <ObjectProblemsetListItem className="list-item-wrapper" list={particularProblemset} /> : null
                        }
                    </div>
                </div>
                :
                null
            }
        </div>
    )
};

const mapStateToProps = (state) => ({
    user: getUserSelector(state),
    object: object(state)
});
const mapDispatchToProps = (dispatch) => ({
    fetchUser: () => dispatch(fetchUser()),
    fetchObject: (username) => dispatch(fetchObject(username))
})

export default connect(mapStateToProps, mapDispatchToProps)(ObjectActionComponent);


