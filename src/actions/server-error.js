import { actionTypeCreator } from './index';

const actionType = actionTypeCreator('@reboxes/server-error');

export const THROW_SERVER_ERROR = actionType('THROW_SERVER_ERROR');

export const throwServerError = (payload, meta) => ({
  type: THROW_SERVER_ERROR,
  payload,
  meta,
  error: true,
});
