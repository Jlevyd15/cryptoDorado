// import individual reducers here
import modalReducer from './modalReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    modalReducer
});
export default rootReducer;