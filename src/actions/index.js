// actions
import { MODAL_OPEN, MODAL_CLOSE, UPDATE_FIELD } from './actionTypes' 


export const modal = {
	open: (id, state, data) => ({ type: MODAL_OPEN, id, state, data }),
	close: (id, state) => ({ type: MODAL_CLOSE, id, state })
}

export const fields = {
	open: (id, value) => { type: UPDATE_FIELD, id, value }
}