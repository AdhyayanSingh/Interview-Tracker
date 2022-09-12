import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../../redux/problemset/problemSetActions';
import { isLoaded } from '../../redux/problemset/problemSetSelector';
import ProblemSetComponent from '../../components/problemSet/problemSetComponent';
import WithSpinner from '../../components/withSpinner/withSpinner';

const ProblemSetWithSpinner = WithSpinner(ProblemSetComponent);

function ProblemSet({ fetchQuestions, isLoaded }) {

    const [page, setPage] = useState(1);
    const [questionPerPage, setQuestionPerPage] = useState(50);

    useEffect(() => {
        const fetch = (page, questionPerPage) => {
            fetchQuestions(page, questionPerPage);
        }
        fetch(page, questionPerPage);
    }, [page, questionPerPage, fetchQuestions]);

    const paginate = (page) => {
        setPage(page);
        setQuestionPerPage(50);
    }

    return (
        <div>
            <ProblemSetWithSpinner paginate={paginate} page={page} questionPerPage={questionPerPage} isLoading={!isLoaded} />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    fetchQuestions: (page, questionPerPage) => dispatch(fetchQuestions(page, questionPerPage)),
});

const mapStateToProps = (state) => ({
    isLoaded: isLoaded(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProblemSet);