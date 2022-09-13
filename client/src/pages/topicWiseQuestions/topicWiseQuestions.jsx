import React, { useEffect } from 'react'
import { fetchTopicwise } from '../../redux/problemset/problemSetActions';
import { isLoaded } from '../../redux/problemset/problemSetSelector';
import WithSpinner from '../../components/withSpinner/withSpinner';
import ProblemSetComponent from '../../components/problemSet/problemSetComponent';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const ProblemSetWithSpinner = WithSpinner(ProblemSetComponent);

const TopicWiseQuestions = ({ fetchTopicwise, isLoaded, match }) => {
    const topic = match.params.topic;

    useEffect(() => {
        const fetchTopicWise = (topic) => fetchTopicwise(topic);
        fetchTopicWise(topic);
    }, [topic, fetchTopicwise]);

    return (
        <ProblemSetWithSpinner isLoading={!isLoaded} topic={topic} />
    )
}

const mapDispatchToProps = (dispatch) => ({
    fetchTopicwise: (topic) => dispatch(fetchTopicwise(topic))
})

const mapStateToProps = (state) => ({
    isLoaded: isLoaded(state)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopicWiseQuestions));