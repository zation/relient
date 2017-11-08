import { combineReducers } from 'redux';
import { reduce } from 'lodash/fp';

import serverError from './reducers/server-error';
import history from './reducers/history';

export default reducers => ({
  entities: combineReducers({
    ...serverError,
    ...history,
    ...reduce((result, item) => ({ ...result, ...item }), {})(reducers),
  }),
});
