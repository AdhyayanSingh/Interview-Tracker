import React from "react";
import { Link } from 'react-router-dom';
import { handleRequest } from '../../api/index';
import { fetchUser } from '../../redux/user/userActions';
import { connect } from 'react-redux';

const FriendRequestComponent = ({ object, index, fetchUser }) => {

    const handleAccept = async () => {
        try {
            const res = await handleRequest(object?._id, { action: 'accept' });
            fetchUser();
            console.log(res);
        } catch (err) {
            alert(err.response?.data?.message);
        }
    };
    const handleReject = async () => {
        try {
            const res = await handleRequest(object?._id, { action: 'reject' });
            fetchUser();
            console.log(res);
        } catch (err) {
            alert(err.response?.data?.message);
        }
    };

    return (
        <tr>
            <td className="col1">{index}</td>
            <td className="col2">
                <Link to={`/user/${object.username}`} className="username">
                    {object.username}
                </Link>
            </td>
            <td className="accept" onClick={handleAccept}>
                Accept
            </td>
            <td className="reject" onClick={handleReject}>
                Reject
            </td>
        </tr>
    );
}

const mapDispatchToProps = (dispatch) => ({
    fetchUser: () => dispatch(fetchUser()),
});

export default connect(null, mapDispatchToProps)(FriendRequestComponent);





