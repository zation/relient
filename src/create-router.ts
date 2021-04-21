import UniversalRouter, {
  Route,
  RouteContext,
  RouterContext,
  Routes,
} from 'universal-router';
import {
  isFunction,
  isArray,
  map,
} from 'lodash/fp';
import type { ElementType } from 'react';
import { getEntity } from './selectors';
import { getWithBaseUrl } from './url';
import { setFeature } from './actions/feature';

export type {
  Route,
  RouteContext,
  RouterContext,
  Routes,
  RouteParams,
} from 'universal-router';

declare module 'universal-router' {
  interface Route<R = any, C extends RouterContext = RouterContext> {
    load?: () => any
    onEnter?: (context: RouteContext<R, C>) => void
    feature?: string
    requireAuth?: boolean
    component?: ElementType
    redirect?: string
    chunks?: string[]
  }
}

interface Params<R = any, C extends RouterContext = RouterContext> {
  routes: Routes<R, C>
  auth?: (params: { requireAuth?: boolean, state: object }) => { redirect?: string }
  baseUrl?: string
}

const convertRoute = (route: Route) => (route && route.load ? { ...route, children: [] } : route);

export default ({
  routes,
  auth,
  baseUrl = '',
  ...options
}: Params) => new UniversalRouter(
  map(convertRoute)(routes),
  {
    ...options,
    baseUrl: baseUrl === '/' ? '' : baseUrl,
    async resolveRoute(context, params) {
      const {
        route,
        store: { dispatch, getState },
      } = context;
      const {
        load,
        action,
        onEnter,
        feature,
        requireAuth,
        component,
        redirect,
      } = route;

      const state = getState();

      if (onEnter) {
        await onEnter(context);
      }
      if (feature) {
        dispatch(setFeature(feature));
      }

      if (auth) {
        const authResult = auth({ requireAuth, state });
        if (authResult) {
          return authResult;
        }
      } else if (requireAuth && !getEntity('auth.isLogin')(state)) {
        return { redirect: getWithBaseUrl('/auth/login', baseUrl) };
      }

      if (redirect || redirect === '') {
        return { ...route, redirect: getWithBaseUrl(redirect, baseUrl) };
      }
      if (component) {
        return route;
      }
      if (isFunction(load)) {
        const module = await load();
        const result = await module.default(context, params);
        if (isArray(result)) {
          route.children = map(convertRoute)(result);
        } else if (result.component) {
          return result;
        } else {
          route.children = [convertRoute(result)];
        }
      }
      if (isFunction(action)) {
        const result = await action(context, params);
        if (result.feature) {
          dispatch(setFeature(result.feature));
        }
        if (result.redirect || result.redirect === '') {
          result.redirect = getWithBaseUrl(result.redirect, baseUrl);
        }
        return { ...context.route, ...result };
      }
      return context.next();
    },
  },
);
