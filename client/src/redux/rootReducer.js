import { combineReducers } from "redux";
import problemSetReducer from '../redux/problemset/problemSetReducer';
import questionReducer from '../redux/question/questionReducer';
import userReducer from '../redux/user/userReducer';
import objectReducer from '../redux/object/objectReducer';

const rootReducer = combineReducers({
    problemset: problemSetReducer,
    question: questionReducer,
    user: userReducer,
    object: objectReducer
});

export default rootReducer;