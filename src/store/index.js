import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'

import actions from '../actions';

// ====

const logger = createLogger({
    duration: true,
});

const store = createStore(
    actions,
    applyMiddleware(logger)
);

// ====

export default store;