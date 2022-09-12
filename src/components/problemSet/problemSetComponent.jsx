/* eslint-disable eqeqeq */
import React from 'react'
import Question from '../../components/question/question';
import Page from '../../components/pagination/pagination';
import { problemset } from '../../redux/problemset/problemSetSelector';
import { getUserSelector } from '../../redux/user/userSelector';
import { connect } from 'react-redux';
import TagsComponent from '../tagsComponent/tagsComponent';

import './problemSetComponent.scss'

const ProblemSetComponent = ({ questionPerPage, paginate, page, problemset, user, topic }) => {
    return (
        <div className="contain">
            <div className="problemset">
                <table className="table1">
                    <thead>
                        <tr>
                            <th className="col1">#</th>
                            <th className="col2">Title</th>
                            {user ? <th className="col31">Solved?</th> : null}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            problemset?.map(e => {
                                let checked = user?.solved.find(el => el == e.id);
                                return <Question key={e.id} question={e} checked={checked} />
                            })
                        }
                    </tbody>
                </table>
                <div className="pagination">
                    {
                        questionPerPage ?
                            <div>
                                <Page items={450 / questionPerPage} paginate={paginate} page={page} />
                            </div>
                            :
                            null
                    }
                </div>
            </div>
            <TagsComponent />
        </div>
    )
};

const mapStateToProps = (state) => ({
    problemset: problemset(state),
    user: getUserSelector(state)
});

export default connect(mapStateToProps)(ProblemSetComponent);