import Immutable from 'immutable';
import FieldRecord from '../records/fieldRecord';

import { UPDATE_FIELD } from '../actions/actionTypes';


const fieldReducer = (fields = Immutable.Map({}), action) => {
	// console.log(action)
	switch (action.type) {
		case UPDATE_FIELD: {
			return fields.update(action.fieldId, new FieldRecord(), field => {
				return field.merge({
					fieldId: action.fieldId,
					value: action.value
				})
			})
		}
		default:
			return fields;
	}
}

export default fieldReducer;