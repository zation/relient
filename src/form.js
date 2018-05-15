import { isNil, reduce } from 'lodash/fp';
import { SubmissionError } from 'redux-form';

export const createOnSubmit = onSubmit => async (values, dispatch, props) => {
  try {
    await onSubmit(values, dispatch, props);
  } catch (error) {
    console.error(error);
    throw new SubmissionError(reduce((object, { field, message }) => ({
      ...object,
      [field === 'default' ? '_error' : field]: message,
    }), {})(error));
  }
};

export const requiredValidator = message => (value) => {
  if (isNil(value) || value === '') {
    return message;
  }
  return undefined;
};

export const sameAsValidator = message => name => (value, allValues) =>
  (value === allValues[name] ? undefined : message);

export const minLengthValidator = message => length => value =>
  (value && value.length < length ? message : undefined);

export const maxLengthValidator = message => length => value =>
  (value && value.length < length ? message : undefined);

export const positiveNumberValidator = message => value =>
  (value !== '' && Number(value) <= 0 ? message : undefined);

export const lessThanValidator = message => name => (value, allValues) =>
  (value !== '' && allValues[name] !== '' && Number(value) > Number(allValues[name]) ? message : undefined);
