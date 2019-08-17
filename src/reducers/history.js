import { handleActions, combineActions } from 'redux-actions';
import { PUSH, GO_BACK, GO_FORWARD, REPLACE, GO, INIT } from '../actions/history';

export default {
  history: handleActions({
    [combineActions(
      PUSH,
      GO_BACK,
      GO_FORWARD,
      REPLACE,
      GO,
      INIT,
    )]: (history, { payload }) => payload,
  }, {}),
};
