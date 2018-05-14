# Redux related utils

Relient provides action, middleware, reducer utils to help you handle API request and merge the payload.

## action utils

### request

API action creator. Query will be processed by [query-string](https://github.com/sindresorhus/query-string).
Belows are request methods:

* `read(url, query, options)`: GET request
* `post(url, data, options)`: POST request
* `put(url, data, options)`: PUT request
* `patch(url, data, options)`: PATCH request
* `del(url, query, options)`: DELETE request

Belows are parameters:

* `url: String`: request url
* `query: Object`: request url query object. For example: `{ language: 'en', amount: 1 }` will become `language=en&amount=1`
* `data: Object`: request data for POST, PUT, PATCH.
* `options: Object`: options for fetch

## actions

### serverError

Server error action, including constant `THROW_SERVER_ERROR` and action `throwServerError`, which has below attributes:

* type: `THROW_SERVER_ERROR`
* payload: the response of API error
* meta: the request data or the result of your custom meta creator
* error: `true`

### history

Client history related actions, including constants: `INIT`, `PUSH`, `REPLACE`, `GO`, `GO_BACK`, `GO_FORWARD` and
actions: `init`, `push`, `replace`, `go`, `goBack`, `goForward`

## reducer utils

### createEntitiesReducer(entityReducers: [reducer])

**Entity** is an API domain. We will put all API related data into the `entities` node of redux store.
And you can use the `getEntity` and `getEntityArray` from `selector` to read them when `connect`.
You should use `createEntitiesReducer` when create redux reducer.

### merge

```js
({
  schema: Schema,
  entityKey: String,
  preProcess: Function,
  dataKey: String,
  processValue: Function,
  postProcess: Function,
}) => (originalData, { payload, meta }) => mergedData
```

Merge API response into redux store with [normalizr](https://github.com/paularmstrong/normalizr).
You should use `merge` in each API reducer for creation and query API.

* schema: Schema of [normalizr](https://github.com/paularmstrong/normalizr)
* entityKey: Which entity key should be merged to. Default is schema key.
* dataKey: Which key should read from the response data. Default is the whole response data.
* preProcess: `({ originalData, meta, payload, data })` => Object. Process data before normalize.
* processValue: `({ meta, originalData, payload, value })` => Object. Process each value after normalize and before merge.
* postProcess: `({ data, originalData, meta, payload })` =>  Object. Process data after merge.

### normalize

```js
schema => data => normalizedData
```

The curried version of normalizr.

### remove

```js
schema => (originalData, { meta }) => removedData
```

Remove entity data for DELETE request.

### replace

```js
schema => (originalData, { payload }) => replacedData
```

Replace entity data.

## reducers

### history

Client history related reducer

### serverError

Server error related reducer

## middlewares

### fetch

```js
({
  fetch: Object,
  apiDomain: String,
  getDefaultHeader: Function,
}) => middleware
```

The middleware to send API request with fetch. And call `serverError` action when failed.

* fetch: fetch instance. For example, you may want to use `isomorphic-fetch/fetch-npm-browserify` in client side and
`isomorphic-fetch/fetch-npm-node` in server side.
* apiDomain: the api domain url and prefix
* getDefaultHeader: `({ getState, withoutAuth }) => Object`. the function to create default header

### history

```js
history => middleware
```

The middleware is used to call history api when history action is called. This middleware should only be used in client side.

* history: history instance.

### serverError

```js
({ onGlobalWarning: Function, onUnauthorized: Function }) => middleware
```

The middleware is used to handle serverError action. And call the hook in different situations.

* onGlobalWarning: `({ payload, dispatch, getState }) => void` Handle the global error
* onUnauthorized: `({ payload, dispatch, getState }) => void` Handle the 401 or 403 error

## selectors

### getEntity

```js
entityKey => state => entityData
```

Get the entity data with Object type.

### getEntityArray

```js
entityKey => state => entityArray
```

Get the entity data with Array type.

### isEntityEmpty

```js
entityKey => state => Boolean
```

Check if entity data is existed.
