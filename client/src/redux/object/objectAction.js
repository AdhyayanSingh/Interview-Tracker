import { getFriend } from '../../api/index';
import types from './types';

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

export const fetchObject = (username) => {
    return async dispatch => {
        dispatch(fetchStart());
        try {
            const res = await getFriend(username);
            dispatch(fetchingSuccess(res.data.user));
        } catch (err) {
            dispatch(fetchFail(err.response?.data.error));
            alert('User not found');
            window.location.href = '/friends';
        }
    }
};
