import { isNil } from 'lodash/fp';

export const required = message => (value) => {
  if (isNil(value) || value === '') {
    return message;
  }
  return undefined;
};

export const sameAs = message => name => (value, allValues) =>
  (value === allValues[name] ? undefined : message);

export const minLength = message => length => value =>
  (value && value.length < length ? message : undefined);

export const maxLength = message => length => value =>
  (value && value.length < length ? message : undefined);

export const positiveNumber = message => value =>
  (value !== '' && Number(value) <= 0 ? message : undefined);

export const lessThan = message => name => (value, allValues) =>
  (value !== '' && allValues[name] !== '' && Number(value) > Number(allValues[name]) ? message : undefined);
