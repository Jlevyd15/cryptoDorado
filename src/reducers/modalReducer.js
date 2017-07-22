import Immutable from 'immutable';
import { MODAL_OPEN } from '../actions/actionTypes';

export default(state = Immutable.Map(), payload) => {
    switch (payload.type) {
        case MODAL_OPEN:
            return state;
        default:
            return state;
    }
};