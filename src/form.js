import { isNil } from 'lodash/fp';

export const composeValidators = (...validators) => (value, allValues, meta) => validators
  .reduce((error, validator) => error || validator(value, allValues, meta), undefined);

export const requiredValidator = (message) => (value) => {
  if (isNil(value) || value === '') {
    return message;
  }
  return undefined;
};

export const sameAsValidator = (message) => (name) => (value, allValues) => (
  (allValues && value === allValues[name]) ? undefined : message
);

export const minLengthValidator = (message) => (length) => (value) => (
  value && value.length < length ? message : undefined
);

export const maxLengthValidator = (message) => (length) => (value) => (
  value && value.length > length ? message : undefined
);

export const positiveNumberValidator = (message) => (value) => (
  value !== '' && Number(value) <= 0 ? message : undefined
);

export const lessOrEqualValidator = (message) => (number) => (value) => (
  value !== '' && Number(value) <= number ? message : undefined
);

export const moreOrEqualValidator = (message) => (number) => (value) => (
  value !== '' && Number(value) >= number ? message : undefined
);

export const lessOrEqualThanValidator = (message) => (name) => (value, allValues) => (
  value !== '' && allValues && allValues[name] !== '' && Number(value) <= Number(allValues[name]) ? message : undefined
);

export const moreOrEqualThanValidator = (message) => (name) => (value, allValues) => (
  value !== '' && allValues && allValues[name] !== '' && Number(value) >= Number(allValues[name]) ? message : undefined
);
