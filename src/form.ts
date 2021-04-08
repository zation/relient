/* eslint-disable no-template-curly-in-string */
/* eslint-disable @typescript-eslint/no-throw-literal */
import { isFinite } from 'lodash/fp';
import { ChangeEvent } from 'react';
import BigNumber from 'bignumber.js';
import type { FormInstance } from 'antd/es/form';
import type { Rule, NamePath } from 'rc-field-form/es/interface';
import type { I18N } from './i18n';

export const createSameAsRule = (
  messageKey: string,
  i18n: I18N,
) => (targetNamePath: NamePath, targetLabel = '') => ({ getFieldValue }: FormInstance) => ({
  async validator(rule: Rule, value: any) {
    if (value && getFieldValue(targetNamePath) !== value) {
      throw { errors: [{ message: i18n(messageKey, { targetLabel, value }) }] };
    }
  },
});

export const createPositiveNumberRule = (
  messageKey: string,
  i18n: I18N,
) => () => ({
  async validator(rule: Rule, value: any) {
    if (value !== '' && Number(value) <= 0) {
      throw { errors: [{ message: i18n(messageKey, { value }) }] };
    }
  },
});

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
