import { ActionFunctions } from 'redux-actions';

declare module 'redux-actions' {
  // https://github.com/redux-utilities/redux-actions/blob/v2.3.0/src/combineActions.js#L21
  // eslint-disable-next-line import/prefer-default-export
  export function combineActions(
    ...actionTypes: Array<ActionFunctions<any> | string | symbol>
  ): string;
}
