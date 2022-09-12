import React from 'react';
import { getUserSelector } from '../../redux/user/userSelector';
import { connect } from 'react-redux';
import FriendComponent from './friendComponent';
import FriendRequestComponent from './friendRequestComponent';
import SearchUser from './searchUser';
import './friendPage.scss';

function FriendListComponent({ user }) {
    return (
        <div className="wrapper1">
            <SearchUser />
            <div className="friends-container">
                <div className="friends">
                    <h6 className="heading">Friends</h6>
                    <table className="friendItem">
                        <tbody>
                            {
                                user?.friends.map((e, i) =>
                                    <FriendComponent key={e._id} object={e} index={i + 1} />
                                )
                            }
                        </tbody>
                    </table>
                </div>

                <div className="friendRequest">
                    <h6 className="heading">Friend Requests</h6>
                    <table className="friendRequestItem">
                        <tbody>
                            {
                                user?.friendRequests.map((e, i) =>
                                    <FriendRequestComponent key={e._id} object={e} index={i + 1} />
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    user: getUserSelector(state),
});

export default connect(mapStateToProps)(FriendListComponent);
