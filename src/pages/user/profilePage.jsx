import React from 'react';
import { connect } from 'react-redux';
import { getUserSelector } from '../../redux/user/userSelector.js';
import { Switch, Route, Redirect, withRouter, useParams } from 'react-router-dom';
import ResetPassword from '../../components/login/resetPassword';
import ProfileComponent from '../../components/profile/profileComponent';


const ProfilePage = ({ user, match }) => {

    const { username } = useParams();

    if (user === undefined) {
        console.log('Not User');
        return <Redirect to='/login'></Redirect>;
    }

    if (user !== null && username !== user.username) {
        return <Redirect to="*" />
    }
    return (
        <div>
            <Switch>
                <Route exact path={`${match.path}`}><ProfileComponent match={match} /></Route>
                <Route exact path={`${match.path}/resetpassword`} component={ResetPassword}></Route>
            </Switch>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: getUserSelector(state),
});

export default withRouter(connect(mapStateToProps)(ProfilePage));