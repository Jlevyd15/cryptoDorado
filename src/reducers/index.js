// import individual reducers here
import modalReducer from './modalReducer';
import fieldReducer from './fieldReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	modals: modalReducer,
	fields: fieldReducer,

});
export default rootReducer;