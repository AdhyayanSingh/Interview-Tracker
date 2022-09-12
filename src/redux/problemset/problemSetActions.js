import { getQuestions, getTopicwiseQuestion } from '../../api/index';
import types from './actionType';

export const fetchingSuccess = (data) => {
    return {
        payload: data,
        type: types.FETCH_SUCCESS
    }
};

export const fetchFail = (err) => {
    return {
        payload: err,
        type: types.FETCH_FAIL
    }
};

export const fetchStart = () => {
    return {
        type: types.FETCHING_START
    }
};

export const fetchQuestions = (page, questionPerPage) => {
    return async dispatch => {
        dispatch(fetchStart());
        try {
            const res = await getQuestions(page, questionPerPage);
            dispatch(fetchingSuccess(res.data.data.question));
        } catch (err) {
            dispatch(fetchFail(err.response?.data.error));
            alert(err.response?.data.error ? err.response.data.error : 'Website is under maintainence');
            window.location.href = '/';
        }

    }
};

export const fetchTopicwise = (topic) => {
    return async dispatch => {
        dispatch(fetchStart());
        try {
            const res = await getTopicwiseQuestion(topic);
            dispatch(fetchingSuccess(res.data.data.questions));
        } catch (err) {
            dispatch(fetchFail(err.response?.data.message));
            alert(err.response?.data.message ? err.response.data.message : 'Website is under maintainence');
            window.location.href = '/';
        }
    }
};