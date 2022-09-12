import React, { useEffect } from 'react';
import { fetchQuestion } from '../../redux/question/questionAction';
import { connect } from 'react-redux';
import { isLoadedQuestion } from '../../redux/question/questionSelector';
import { withRouter } from 'react-router-dom';
import QuestionDetailComponent from '../../components/questionDetail/questionDetailComponent';
import WithSpinner from '../../components/withSpinner/withSpinner';

const QuestionDetailWithSpinner = WithSpinner(QuestionDetailComponent);


function QuestionDetail({ fetchQuestion, match, isLoadedQuestion }) {

    const id = match.params.index;
    useEffect(() => {

        const fetchQue = (id) => {
            fetchQuestion(id)
        }

        fetchQue(id);

    }, [fetchQuestion, id])
    return (
        <QuestionDetailWithSpinner isLoading={!isLoadedQuestion} />
    )
}

const mapDispatchToProps = (dispatch) => ({
    fetchQuestion: (id) => dispatch(fetchQuestion(id)),
});

const mapStateToProps = (state) => ({
    isLoadedQuestion: isLoadedQuestion(state)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionDetail));