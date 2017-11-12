import { combineReducers } from 'redux';
import { reduce } from 'lodash/fp';

import serverError from './server-error';
import history from './history';

export default entityReducers => ({
  entities: combineReducers({
    ...serverError,
    ...history,
    ...reduce((result, item) => ({ ...result, ...item }), {})(entityReducers),
  }),
});
