import { createAction as originalCreateAction } from 'redux-actions';

export const actionTypeCreator = (prefix: string) => (actionName: string): string => `~${prefix}#${actionName}`;

export const createAction = (
  type: string,
  payloadCreator?,
  metaCreator?,
) => originalCreateAction(type, payloadCreator, metaCreator || ((data) => data));

export {
  read, post, del, patch, put,
} from './request';
