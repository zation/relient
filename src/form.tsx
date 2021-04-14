/* eslint-disable no-template-curly-in-string */
/* eslint-disable @typescript-eslint/no-throw-literal */
import React, {
  ChangeEvent,
  createContext,
  ReactNode,
  useContext,
} from 'react';
import {
  flow,
  identity,
  isFinite,
  isNil,
  nth,
  size,
  split,
} from 'lodash/fp';
import BigNumber from 'bignumber.js';
import type {
  NamePath,
  Rule,
  RuleObject,
  RuleRender,
} from 'rc-field-form/es/interface';
import type { I18N } from './i18n';

export interface SameAsRule {
  (targetNamePath: NamePath, targetLabel: string): RuleRender
}

export const createSameAsRule = (i18n: I18N) => (messageKey: string): SameAsRule => (
  targetNamePath,
  targetLabel,
) => ({ getFieldValue }) => ({
  async validator(rule: Rule, value: any) {
    if (value && getFieldValue(targetNamePath) !== value) {
      throw { errors: [{ message: i18n(messageKey, { targetLabel, value }) }] };
    }
  },
});

export const createPositiveNumberRule = (i18n: I18N) => (messageKey: string) => ({
  async validator(rule: Rule, value: any) {
    if (value !== '' && Number(value) <= 0) {
      throw { errors: [{ message: i18n(messageKey, { value }) }] };
    }
  },
});

export const createPriceRule = (i18n: I18N) => (messageKey: string) => ({
  async validator(rule: Rule, value: any) {
    if (value === '' || isNil(value)) {
      return undefined;
    }
    if (!isFinite(Number(value))) {
      throw { errors: [{ message: i18n(messageKey, { value }) }] };
    }
    if (typeof value === 'string' && Number(value) > 0 && flow(split('.'), nth(1), size)(value) <= 2) {
      return undefined;
    }
    throw { errors: [{ message: i18n(messageKey, { value }) }] };
  },
});

export interface RuleContextType {
  sameAsRule: SameAsRule,
  positiveNumberRule: RuleObject,
  priceRule: RuleObject,

  [key: string]: ((...params: any) => Rule) | Rule
}

const defaultSameAs = 'Input should be the same as before';
const defaultPositiveNumber = 'Please input positive number';
const defaultPrice = 'Price is invalid';
export const RuleContext = createContext<RuleContextType>({
  sameAsRule: createSameAsRule(identity)(defaultSameAs),
  positiveNumberRule: createPositiveNumberRule(identity)(defaultPositiveNumber),
  priceRule: createPriceRule(identity)(defaultPrice),
});

export interface RuleContextProviderProps {
  i18n: I18N
  messages?: {
    sameAs?: string
    positiveNumber?: string
    price?: string
  }
  rules?: {
    [key: string]: ((...params: any) => Rule) | Rule
  }
  children: ReactNode
}

export const RuleContextProvider = ({
  i18n,
  messages: {
    sameAs = defaultSameAs,
    positiveNumber = defaultPositiveNumber,
    price = defaultPrice,
  } = {},
  rules,
  children,
}: RuleContextProviderProps) => (
  <RuleContext.Provider
    value={{
      sameAsRule: createSameAsRule(i18n)(sameAs),
      positiveNumberRule: createPositiveNumberRule(i18n)(positiveNumber),
      priceRule: createPriceRule(i18n)(price),
      ...rules,
    }}
  >
    {children}
  </RuleContext.Provider>
);

export const useRuleContext = useContext<RuleContextType>(RuleContext);

export const normalizePercentage = (number: any) => {
  if (number && isFinite(Number(number))) {
    return new BigNumber(number).multipliedBy(100).toNumber();
  }
  return number;
};
export const getPercentageFromEvent = ({
  target: { value },
}: ChangeEvent<HTMLInputElement>) => {
  if (value && isFinite(Number(value))) {
    return new BigNumber(value).dividedBy(100).toNumber();
  }
  return value;
};
