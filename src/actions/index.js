import {
  createAction as originalCreateAction,
} from 'redux-actions';

export const actionTypeCreator = prefix => actionName => `~${prefix}#${actionName}`;

export const createAction = (type, payloadCreator, metaCreator) =>
  originalCreateAction(type, payloadCreator, metaCreator || (data => data));

export { handleActions, combineActions } from 'redux-actions';

export { read, post, del, patch, put } from './request';
