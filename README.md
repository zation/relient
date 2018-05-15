# Relient

Relient is an util set working closely with [Relient-Cli](https://github.com/zation/relient-cli). It will be useful
if your project is built on React, Redux, Redux-Form and of course Relient-Cli.

## Install

```bash
$ npm install relient --save
```

## Redux utils

Relient provides action, middleware, reducer utils to help you handle API request and merge the payload. [Check the API document](docs/redux.md)

### Create action

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

### Create reducer

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

### Create store with middlewares in Relient

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

## Config

Relint config provide consistent configration between server side and client side. You can do the configuration in a config file and change it with environment varables. It requires Relient-Cli. You need to inject the global configs in client side:

html.js

```js
import React from 'react';
import clientConfig from 'relient/config/client-config';

export default () => (
  <html className="no-js" lang="en">
    <head>
    	...
    </head>
    <body>
      <script dangerouslySetInnerHTML={{ __html: clientConfig }} />
      ...
    </body>
  </html>
)
```

Then you can use `getConfig` in your code:

header.js

```js
import getConfig from 'relient/config';

export default () => (
  <div>{getConfig('slogon')}</div>
)
```

## Formatters

Relient provides common formatters to display date, time, price and percentage. [Check the API document](docs/formatter.md)

```js
import { date, time, price, percentage } from 'relient/formatters'

const originalDate = new Date('2018-01-01');
const formattedDate = date('YYYY-M-D')(originalDate); // 2018-1-1

const originalTime = new Date('2018-01-01 01:01:01');
const formattedDate = date('YYYY-M-D H:m:s')(originalTime); // 2018-1-1 1:1:1

const originalPrice = 100;
const formattedPrice = price()(originalPrice); // 100.00

const originalPercentage = 0.2;
const formattedPercentage = percentage()(originalPercentage); // 20%
```

## I18N

Relient provides a simple i18n mechanism, which compatible with React: [Check the API document](docs/i18n.md)

```js
import React from 'react';
import i18n from 'relient/i18n';

const messages = {
  title: 'The total mount is {total}, and the top one is {top}',
}

export default () => (
  <div>{i18n(messages)('total', { total: 1, top: <b>Alex</b> })}</div>
)
```

## DOM

Relient provides a simple **head** elements maintenance utils: [Check the API document](docs/dom.md)

```js
import { updateMeta, updateCustomMeta, updateLink } from 'relient/dom';

updateMeta('description', 'web site description');
updateCustomMeta('og:url', 'canonical url');
updateLink('canonical', 'canonical url');
```



