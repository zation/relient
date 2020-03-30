import { THROW_SERVER_ERROR } from '../actions/server-error';

interface Callback {
  ({ payload: object, dispatch, getState }): void
}

export default ({
  onGlobalWarning,
  onUnauthorized,
}: {
  onGlobalWarning?: Callback,
  onUnauthorized?: Callback,
} = {}) => ({ dispatch, getState }) => (next) => (action) => {
  if (action.type === THROW_SERVER_ERROR) {
    const {
      meta: { status, ignoreGlobalWarning, ignoreAuthRedirection },
      payload,
    } = action;
    if (!ignoreGlobalWarning && onGlobalWarning) {
      onGlobalWarning({ payload, dispatch, getState });
    }
    if ((status === 401 || status === 403) && !ignoreAuthRedirection && onUnauthorized) {
      onUnauthorized({ payload, dispatch, getState });
    }
  }
  return next(action);
};
