import { THROW_SERVER_ERROR } from '../actions/server-error';

export default ({ onGlobalWarning, onUnauthorized } = {}) => ({ dispatch }) => next => (action) => {
  if (action.type === THROW_SERVER_ERROR) {
    const {
      meta: { status, ignoreGlobalWarning, ignoreAuthRedirection },
      payload,
    } = action;
    if (!ignoreGlobalWarning && onGlobalWarning) {
      onGlobalWarning({ payload, dispatch });
    }
    if (status === 401 && !ignoreAuthRedirection && onUnauthorized) {
      onUnauthorized({ payload, dispatch });
    }
  }
  return next(action);
};
