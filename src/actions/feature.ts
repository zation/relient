import { createAction, actionTypeCreator } from './index';

const actionType = actionTypeCreator(__filename);

export const SET_FEATURE = actionType('SET_FEATURE');
export const setFeature = createAction<string>(SET_FEATURE);
