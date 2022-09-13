import React from 'react';
import { Link } from 'react-router-dom';
import { getUserSelector } from '../../redux/user/userSelector';
import { connect } from 'react-redux';

import './header.scss';

const Header = ({ user }) => {

    return (
        <nav>
            {
                user ?
                    <div className="nav-bar">
                        <div className="nav-item-c brand">
                            <Link to='/' className="nav-link-c">{'<Interview Tracker>;'}</Link>
                        </div>

                        <Link className="nav-link-c nav-item-c" to={`/${user.username}/profile`}>
                            <div className="">
                                {user.username}
                            </div>
                        </Link>

                        <Link className="nav-link-c nav-item-c" to="/list?name=Favorites">
                            <div className="">
                                My List
                            </div>
                        </Link>

                        <Link className="nav-link-c nav-item-c" to="/friends">
                            <div className="">
                                Friends
                            </div>
                        </Link>

                        <Link className="nav-link-c nav-item-c logout" to="/logout">
                            <div className="">
                                Logout
                            </div>
                        </Link>
                    </div>
                    :
                    <div className="nav-bar">
                        <div className="nav-item-c brand">
                            <Link to='/' className="nav-link-c">{'<Interview Tracker>;'}</Link>
                        </div>

                        <Link className="nav-link-c login nav-item-c" to='/login'>
                            <div className="">
                                Login
                            </div>
                        </Link>
                    </div>
            }
        </nav>
    );
};

const mapStateToProps = (state) => ({
    user: getUserSelector(state),
});

export default connect(mapStateToProps)(Header);