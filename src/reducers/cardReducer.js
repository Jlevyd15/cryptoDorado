import Immutable from 'immutable';
import { TOGGLE_CARD } from '../actions/actionTypes';
import CardRecord from '../records/cardRecord';

const cardReducer = (cards = Immutable.Map({}), action) => {
	switch (action.type) {
		case TOGGLE_CARD: {
			return cards.update(action.id, new CardRecord(), card => {
				return card.merge({
					id: action.id,
					hidden: card.hidden === true ? false : true,
				})
			})
		}
		default:
			return cards;
	}
}

export default cardReducer;

// { type: 'TOGGLE_CARD', id: 'BTC_CARD' }