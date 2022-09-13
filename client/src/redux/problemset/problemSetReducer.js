import types from './actionType';

const INTIAL_STATE = {
    questions: null,
    isLoading: false,
    error: undefined
}

const problemSetReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case types.FETCHING_START: return ({
            ...state,
            isLoading: true,
        });
        case types.FETCH_SUCCESS: return ({
            error: undefined,
            questions: action.payload,
            isLoading: false
        });
        case types.FETCH_FAIL: return ({
            ...state,
            error: action.payload,
            isLoading: false,
            questions: null
        });
        default: return state;
    }
}

export default problemSetReducer;