import cookie from 'js-cookie';

export default ({
  authorizationCookieName,
  loginActionType,
  logoutActionType,
  conditionToSetCookie,
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
