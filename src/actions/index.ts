import {
  ActionFunctionAny,
  createAction as originalCreateAction,
} from 'redux-actions';
import { identity } from 'lodash/fp';

export const actionTypeCreator = (prefix: string) => (actionName: string): string => `~${prefix}#${actionName}`;

export const createAction = <Payload, Meta>(
  type: string,
  payloadCreator?: ActionFunctionAny<Payload>,
  metaCreator?: ActionFunctionAny<Meta>,
) => originalCreateAction(type, payloadCreator || identity, metaCreator || identity);

export {
  read, post, del, patch, put,
} from './request';
