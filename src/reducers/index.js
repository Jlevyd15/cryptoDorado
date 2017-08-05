// import individual reducers here
import modalReducer from './modalReducer';
import fieldReducer from './fieldReducer';
import cardReducer from './cardReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	modals: modalReducer,
	fields: fieldReducer,
	cards: cardReducer
});
export default rootReducer;