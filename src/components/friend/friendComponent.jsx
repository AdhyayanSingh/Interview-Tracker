import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeFriend } from '../../api/index';
import { fetchUser } from '../../redux/user/userActions';
import ConfirmRemoveCompoment from '../confirmRemoveForm/confirmRemoveCompoment';
import ModalWrapper from '../modal/modal';

const Modal = ModalWrapper(ConfirmRemoveCompoment);

const FriendComponent = ({ object, index, fetchUser }) => {

    const [show, setShowModal] = useState(false);

    const hideModal = () => {
        setShowModal(false);
    }

    const handleRemoveFriend = async () => {
        try {
            await removeFriend(object?._id);
            fetchUser();
        } catch (err) {
            alert(err.response?.data?.message);
        }
    }
    return (
        <tr>
            <td className="col1">{index}</td>
            <td className="col2">
                <Link to={`/user/${object.username}`} className="username">
                    {object.username}
                </Link>
            </td>
            <td className="unfriend" onClick={() => { setShowModal(true) }}>
                Unfriend
            </td>
            {
                show ? <Modal onHide={hideModal} show={show} handleDeleteEle={handleRemoveFriend} hideModal={hideModal} /> : null
            }
        </tr>
    )
};

const mapDispatchToProps = (dispatch) => ({
    fetchUser: () => dispatch(fetchUser()),
})

export default connect(null, mapDispatchToProps)(FriendComponent);

