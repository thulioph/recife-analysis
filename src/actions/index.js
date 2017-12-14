import { combineReducers } from 'redux';

import table from './table';
import search from './search';
import system from './system';

export default combineReducers({
    table,
    search,
    system,
});