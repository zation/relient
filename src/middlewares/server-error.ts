import type { Middleware } from 'redux';
import { Dispatch } from 'redux';
import { THROW_SERVER_ERROR } from '../actions/server-error';

interface Callback <S, D extends Dispatch = Dispatch>{
  ({ payload, getState, dispatch }: { payload: object, getState(): S, dispatch: D }): void
}

export default <State, D extends Dispatch = Dispatch>({
  onGlobalWarning,
  onUnauthorized,
}: {
  onGlobalWarning?: Callback<State, D>,
  onUnauthorized?: Callback<State, D>,
} = {}): Middleware<{}, State, D> => ({ getState, dispatch }) => (next) => (action) => {
  if (action.type === THROW_SERVER_ERROR) {
    const {
      meta: { status, ignoreGlobalWarning, ignoreAuthRedirection },
      payload,
    } = action;
    if (!ignoreGlobalWarning && onGlobalWarning) {
      onGlobalWarning({ payload, getState, dispatch });
    }
    if ((status === 401 || status === 403) && !ignoreAuthRedirection && onUnauthorized) {
      onUnauthorized({ payload, getState, dispatch });
    }
  }
  return next(action);
};
