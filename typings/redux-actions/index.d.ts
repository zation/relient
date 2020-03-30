// Type definitions for redux-actions 2.6
// Project: https://github.com/redux-utilities/redux-actions
// Definitions by: Jack Hsu <https://github.com/jaysoo>,
//                 Alex Gorbatchev <https://github.com/alexgorbatchev>,
//                 Alec Hill <https://github.com/alechill>
//                 Alexey Pelykh <https://github.com/alexey-pelykh>
//                 Thiago de Andrade <https://github.com/7hi4g0>
//                 Ziyu <https://github.com/oddui>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2

declare module 'redux-actions' {

  export interface Action<Payload, Meta> {
    type: string;
    payload: Payload;
    meta?: Meta;
    error?: boolean;
  }

  // https://github.com/redux-utilities/redux-actions/blob/v2.3.0/src/combineActions.js#L27
  export interface CombinedActionType {
    _dummy: undefined;
  }

  export type ReducerMapValue<Payload, Meta> =
    Reducer<Payload, Meta>
    | ReducerNextThrow<Payload, Meta>
    | ReducerMap<Payload, Meta>;

  export interface ReducerMap<Payload, Meta> {
    [actionType: string]: ReducerMapValue<Payload, Meta>;
  }

  export interface ReducerNextThrow<Payload, Meta> {
    next?(state: any, action: Action<Payload, Meta>): any;

    throw?(state: any, action: Action<Payload, Meta>): any;
  }

  export type BaseActionFunctions<TAction> =
    ActionFunction0<TAction> |
    ActionFunction1<any, TAction> |
    ActionFunction2<any, any, TAction> |
    ActionFunction3<any, any, any, TAction> |
    ActionFunction4<any, any, any, any, TAction> |
    ActionFunctionAny<TAction>;

  export type ActionFunctions<Payload, Meta> = BaseActionFunctions<Action<Payload, Meta>>;

  export type Reducer<Payload, Meta> = (
    state: any,
    action: Action<Payload, Meta>,
  ) => any;

  /** argument inferring borrowed from lodash definitions */
  export type ActionFunction0<R> = () => R;
  export type ActionFunction1<T1, R> = (t1: T1) => R;
  export type ActionFunction2<T1, T2, R> = (t1: T1, t2: T2) => R;
  export type ActionFunction3<T1, T2, T3, R> = (t1: T1, t2: T2, t3: T3) => R;
  export type ActionFunction4<T1, T2, T3, T4, R> = (
    t1: T1,
    t2: T2,
    t3: T3,
    t4: T4,
  ) => R;
  export type ActionFunctionAny<R> = (...args: any[]) => R;

  export function createAction<Payload, Meta>(
    actionType: string,
    payloadCreator?: ActionFunctionAny<Payload>,
    metaCreator?: ActionFunctionAny<Meta>,
  ): ActionFunctionAny<Action<Payload, Meta>>;

  export function handleAction<State, Payload, Meta>(
    actionType: string | ActionFunctions<Payload, Meta> | CombinedActionType,
    reducer: Reducer<Payload, Meta> | ReducerNextThrow<Payload, Meta>,
    initialState: State,
  ): Reducer<Payload, Meta>;

  export interface Options {
    prefix?: string;
    namespace?: string;
  }

  export function handleActions<Payload, Meta>(
    reducerMap: ReducerMap<Payload, Meta>,
    initialState: any,
    options?: Options,
  ): Reducer<Payload, Meta>;

  // https://github.com/redux-utilities/redux-actions/blob/v2.3.0/src/combineActions.js#L21
  export function combineActions(
    ...actionTypes: Array<ActionFunctions<any, any> | string | symbol>
  ): string;

  export interface ActionMap<Payload, Meta> {
    [actionType: string]:
      ActionMap<Payload, Meta> |
      ActionFunctionAny<Payload> |
      [ActionFunctionAny<Payload>, ActionFunctionAny<Meta>] |
      undefined;
  }

  export function createActions<Payload, Meta>(
    actionMapOrIdentityAction: ActionMap<Payload, Meta> | string,
    ...identityActions: Array<string | Options>
  ): {
    [actionName: string]: ActionFunctionAny<Action<Payload, Meta>>
  };
}
