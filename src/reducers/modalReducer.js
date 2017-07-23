import Immutable from 'immutable';
import { MODAL_OPEN, MODAL_CLOSE } from '../actions/actionTypes';
import ModalRecord from '../records/modalRecord';

const modalReducer = (modals = Immutable.Map({}), action) => {
	switch (action.type) {
		case MODAL_OPEN: {
			return modals.update(action.id, new ModalRecord(), modal => {
				return modal.merge({
					id: action.id,
					open: action.state,
					data: action.data
				})
			})
		}
		case MODAL_CLOSE: {
			return modals.update(action.id, new ModalRecord(), modal => {
				return modal.merge({
					id: action.id,
					open: action.state
				})
			})
		}
		default:
			return modals;
	}
}

export default modalReducer;

// { type: 'MODAL_OPEN', id: 'MODAL_SETUP', state: true }