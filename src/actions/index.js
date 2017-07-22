// actions
import { MODAL_OPEN } from './actionTypes' 

export const modal = {
	open: (id, state) => { type: MODAL_OPEN, id, state }
}