/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { deleteList } from '../../api/index';
import { fetchUser } from '../../redux/user/userActions';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import ModalWrapper from '../../components/modal/modal';
import ConfirmRemoveCompoment from './../confirmRemoveForm/confirmRemoveCompoment';

import './list.scss';

const Modal = ModalWrapper(ConfirmRemoveCompoment);

function ProblemSetItem({ el, func, fetchUser, index }) {

    const loc = useLocation();
    let val = queryString.parse(loc.search);

    const [deletelist, setdeletelist] = useState(false);
    const history = useHistory();

    const [modalShow, setModalShow] = useState(false);
    const hideModal = () => {
        setModalShow(false);
    }

    const handleDeleteEle = async () => {
        try {
            const res = await deleteList(el._id);
            setdeletelist(e => !e);
            fetchUser();
            hideModal();
            history.push('/list?name=Favorites');
        } catch (err) {
            alert(err.response.data.message);
        }
    }
    return (
        <tr className="table-row">
            <td className={`table-col problemset-index ${el.name === val.name ? 'active' : ''}`}>{index}</td>
            <td className={`table-col problemset-name ${el.name === val.name ? 'active' : ''}`} onClick={(f) => func(el.name)}>{el.name}</td>
            {
                el.name === 'Favorites' ?  <td className="table-col problemset-remove-fav">Remove</td> : <td className="table-col problemset-remove" onClick={e => setModalShow(true)}>Remove</td>
            }
            <Modal onHide={() => setModalShow(false)} show={modalShow} handleDeleteEle={handleDeleteEle} hideModal={hideModal} />
        </tr>
    )
};

const mapDispatchToProps = (dispatch) => ({
    fetchUser: () => dispatch(fetchUser())
});

export default connect(null, mapDispatchToProps)(ProblemSetItem);