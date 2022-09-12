import types from './types';
const INITIAL_STATE = {
    object: null,
    isLoading: false,
    error: ''
};

const objectReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.FETCHING_START: return ({
            ...state,
            isLoading: true,
        });
        case types.FETCH_SUCCESS: return ({
            error: undefined,
            object: action.payload,
            isLoading: false
        });
        case types.FETCH_FAIL: return ({
            error: action.payload,
            isLoading: false,
            object: null
        });
        default: return state;
    }

};

export default objectReducer;