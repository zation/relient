import cookie from 'js-cookie';
import { constant } from 'lodash/fp';

export default ({
  authorizationCookieName,
  loginActionType,
  logoutActionType,
  conditionToSetCookie = constant(true),
}) => () => next => (action) => {
  const { payload, type } = action;
  if (type === loginActionType) {
    const { authorization } = payload;
    if (conditionToSetCookie(payload)) {
      cookie.set(authorizationCookieName, authorization);
    }
  }
  if (type === logoutActionType) {
    cookie.remove(authorizationCookieName);
  }
  return next(action);
};
