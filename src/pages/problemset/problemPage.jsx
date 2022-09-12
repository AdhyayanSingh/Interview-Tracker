import React from 'react';
import QuestionDetail from '../../pages/questionDetail/questionDetail';
import { Route, Switch, withRouter } from 'react-router-dom';
import TopicWiseQuestions from '../topicWiseQuestions/topicWiseQuestions';
import ProblemSet from './problemSet';
import Errorpage from '../error/errorpage';


const ProblemPage = ({ match }) => {
    return (
        <div>
            <div>
                <Switch>
                    <Route exact path={`${match.path}`}><ProblemSet /></Route>
                    <Route exact path={`${match.path}/problem/:index`}><QuestionDetail /></Route>
                    <Route exact path={`${match.path}/topicwise/:topic`}><TopicWiseQuestions /></Route>
                    <Route path="*" component={Errorpage} />
                </Switch>
            </div>
        </div>
    )
};


export default withRouter(ProblemPage);