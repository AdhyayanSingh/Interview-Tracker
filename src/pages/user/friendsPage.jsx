import React from 'react';
import FriendListComponent from '../../components/friend/friendListComponent';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Errorpage from '../error/errorpage';

function FriendsPage() {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${match.path}`}><FriendListComponent /></Route>
            <Route path="*" component={Errorpage} />
        </Switch>
    )
};
export default FriendsPage;