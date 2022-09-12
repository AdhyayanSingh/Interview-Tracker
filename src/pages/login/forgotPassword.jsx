import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import ForgotPasswordAck from '../../components/login/forgotPasswordAck';
import ResetPassword from '../../components/login/resetPassword';
import ForgotPassword from '../../components/login/forgotPassword';

const Error404 = () => {
    return <h1>Error</h1>;
}

const ForgotPasswordPage = ({ match }) => {

    return (
        <div>
            <Switch>
                <Route exact path={`${match.path}`} component={ForgotPassword}></Route>
                <Route exact path={`${match.path}/done`} component={ForgotPasswordAck}></Route>
                <Route exact path={`${match.path}/token/:token`} component={ResetPassword}></Route>
                <Route path="*" component={Error404} />
            </Switch>
        </div>
    )
};

export default withRouter(ForgotPasswordPage);