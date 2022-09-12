import { loginUser, getUser, logout, signupUser } from '../../api/index';
import types from './types';

export const fetchSuccess = (data) => {
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

export const login = (body, history) => {
    return async dispatch => {
        dispatch(fetchStart());
        try {
            const res = await loginUser(body);
            dispatch(fetchSuccess(res.data.user));
            history.replace('/problemset');
        } catch (err) {
            dispatch(fetchFail(err.response.data.message));
            alert(err.response.data.message);
        }
    }
};

export const signup = (body, history) => {
    return async dispatch => {
        dispatch(fetchStart());
        try {
            const res = await signupUser(body);
            dispatch(fetchSuccess(res.data.user));
            history.replace('/problemset');
        } catch (err) {
            dispatch(fetchFail(err.response.data.message));
            alert(err.response.data.message);
        }
    }
};

export const toggleSolvedAction = (id) => ({
    type: types.TOGGLE_SOLVED,
    payload: id
});

export const fetchUser = () => {
    return async dispatch => {
        dispatch(fetchStart());
        try {
            const res = await getUser();
            const user = res.data.user ? res.data.user : undefined;
            dispatch(fetchSuccess(user));
        } catch (err) {
            dispatch(fetchFail(err.response?.data.message));
            alert(err.response?.data.message ? err.response.data.message : 'Website is under maintainence');
        }
    }
};

export const logoutUser = () => {
    return async dispatch => {
        await logout();
        dispatch(fetchSuccess(null));
    }
};

export const updatePhoto = (data) => {
    return {
        type: types.UPDATE_PHOTO,
        payload: data
    }
};

export const addProblem = (data, id) => {
    return {
        type: types.ADD_PROBLEM,
        payload: { data, id }
    }
};

export const addAList = (data) => {
    return {
        type: types.ADD_A_LIST,
        payload: data
    }
}