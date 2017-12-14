import { combineReducers } from 'redux';

import table from './table';
import search from './search';

export default combineReducers({
    table,
    search,
});