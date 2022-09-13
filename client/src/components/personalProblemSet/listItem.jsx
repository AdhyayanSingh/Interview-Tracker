import React, { useState } from 'react';
import { deleteListItem } from '../../api/index';
import { fetchUser } from '../../redux/user/userActions';
import { connect } from 'react-redux';
import ModalWrapper from '../../components/modal/modal';
import ConfirmRemoveCompoment from './../confirmRemoveForm/confirmRemoveCompoment';

const Modal = ModalWrapper(ConfirmRemoveCompoment);

function ListItem({ el, sid, fetchUser, index }) {

    const [modalShow, setModalShow] = useState(false);

    const hideModal = () => {
        setModalShow(false);
    }

    const handleDeleteEle = async () => {
        console.log(sid, el._id);
        try {
            const data = { sid: sid };
            await deleteListItem(el._id, data);
            fetchUser();
            hideModal();
        } catch (err) {
            alert(err.response.data.message);
        }
    }

    return (
        <tr className="table-row">
            <td className="table-col list-index">{index}</td>
            <td className="table-col list-name"><a href={el.link} target="_blank" rel="noreferrer" className="list-title">{el.title}</a></td>
            <td className="table-col list-item-remove" onClick={() => setModalShow(true)}>Remove</td>
            <Modal onHide={() => setModalShow(false)} show={modalShow} handleDeleteEle={handleDeleteEle} hideModal={hideModal} />
        </tr>
    )
}

const mapDispatchToProps = (dispatch) => ({
    fetchUser: () => dispatch(fetchUser())
});

export default connect(null, mapDispatchToProps)(ListItem);