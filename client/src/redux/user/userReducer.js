/* eslint-disable eqeqeq */
import types from "./types";

const addProblem = (user, { data, id }) => {
    let problemsets = user.problemsets;
    let playlist = problemsets.find(el => el._id == id);
    playlist.list.push(data);
    user.problemsets = problemsets;
    return user;
};

const INITIAL_STATE = {
    user: null,
    isLoading: false,
    error: undefined
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.FETCHING_START: return ({
            ...state,
            isLoading: true
        })
        case types.FETCH_SUCCESS: return ({
            error: undefined,
            user: action.payload,
            isLoading: false
        })
        case types.FETCH_FAIL: return ({
            ...state,
            isLoading: false,
            user: null,
            error: action.payload
        })
        case types.ADD_PROBLEM: return ({
            ...state,
            user: addProblem(state.user, action.payload)
        })
        default: return ({
            ...state
        })
    }
};
export default userReducer;