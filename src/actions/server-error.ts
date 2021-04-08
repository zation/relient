import { actionTypeCreator } from './index';

const actionType = actionTypeCreator('@relient/server-error');

export const THROW_SERVER_ERROR = actionType('THROW_SERVER_ERROR');

export const throwServerError = <Payload, Meta>(payload: Payload, meta: Meta) => ({
  type: THROW_SERVER_ERROR,
  payload,
  meta,
  error: true,
});
