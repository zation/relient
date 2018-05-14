# Relient

Relient is an util set working closely with [Relient-Cli](https://github.com/zation/relient-cli). It will be useful
if your project is built on React, Redux, Redux-Form and of course Relient-Cli.

## Install

```bash
$ npm install relient --save
```

## Usage

### Redux utils

Relient provides action, middleware, reducer utils to help you handle API request and merge the payload.

#### Create action

actions/account.js

```js
import { createAction, actionTypeCreator, post, read, put, del } from 'relient/actions';

const actionType = actionTypeCreator(__filename);

export const READ_ALL = actionType('READ_ALL');
export const CREATE = actionType('CREATE');
export const UPDATE = actionType('UPDATE');
export const REMOVE = actionType('REMOVE');

export const readAll = createAction(
  READ_ALL,
  () => read('/account/all'),
);

export const create = createAction(
  CREATE,
  ({ username, password }) => post('/account', { username, password }),
);

export const update = createAction(
  UPDATE,
  ({ id, username, password }) => put(`/account/${id}`, { username, password }),
);

export const remove = createAction(REMOVE, ({ id }) => del(`/account/${id}`));

```

#### Create reducer

reducers/account.js

```js
import { merge, remove, handleActions, combineActions } from 'relient/reducers';
import { account } from '../schema';
import { UPDATE, READ_ALL, CREATE, REMOVE } from '../actions/account';

export default {
  account: handleActions({
    [combineActions(
      UPDATE,
      CREATE,
    )]: merge({ schema: account }),

    [READ_ALL]: merge({ schema: account }),

    [REMOVE]: remove(account),

  }, {}),
};

```

reducers/index.js

```js
import { createEntitiesReducer, history, serverError } from 'relient/reducers';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import { account } from './account'

export default combineReducers({
  ...createEntitiesReducer([ account ]),
  history,
  serverError,
  form: formReducer,
});

```

#### Create store with middlewares in Relient

```js
import { fetch, history, serverError } from 'relient/middleware'
import { createStore, applyMiddleware } from 'redux';
import fetchInstance from 'isomorphic-fetch/fetch-npm-browserify' // or 'isomorphic-fetch/fetch-npm-node' in server side
import reducers from './reducers';

const initialState = {};

export default createStore(
  reducers,
  initialState,
  applyMiddleware({
    fetch({
      fetch: fetchInstance,
      apiDomain: 'https://your-api-domain',
      getDefaultHeader: ({ getState, withoutAuth }) => {
        // Return your default header object
      },
    })
    serverError({
      onUnauthorized: ({ payload, dispatch, getState }) => {
        // Handle 401 and 403 error
      },
      onGlobalWarning: ({ payload, dispatch, getState }) => {
        // Handle global API error
      }
    }),
  }),
);

```

## API

* [redux related utils](docs/redux.md)

