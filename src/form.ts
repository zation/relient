import { isNil } from 'lodash/fp';
import { FieldValidator } from 'final-form';

export interface Validator {
  (message: string):
    FieldValidator<string> |
    ((number: number) => FieldValidator<string>) |
    ((name: string) => FieldValidator<string>)
}

export const composeValidators = (
  ...validators: FieldValidator<string>[]
): FieldValidator<string> => (
  value, allValues, meta,
) => validators.reduce((
  error,
  validator,
) => error || validator(value, allValues, meta), undefined);

export const requiredValidator: Validator = (message) => (value) => {
  if (isNil(value) || value === '') {
    return message;
  }
  return undefined;
};

export const sameAsValidator: Validator = (message) => (name) => (
  value,
  allValues,
) => (
  (allValues && value !== allValues[name]) ? message : undefined
);

export const minLengthValidator: Validator = (message) => (length) => (value) => (
  value && value.length < length ? message : undefined
);

export const maxLengthValidator: Validator = (message) => (length) => (value) => (
  value && value.length > length ? message : undefined
);

export const positiveNumberValidator: Validator = (message) => (value) => (
  value !== '' && Number(value) <= 0 ? message : undefined
);

export const lessOrEqualValidator: Validator = (message) => (number) => (value) => (
  value !== '' && Number(value) > number ? message : undefined
);

export const moreOrEqualValidator: Validator = (message) => (number) => (value) => (
  value !== '' && Number(value) < number ? message : undefined
);

export const lessOrEqualThanValidator: Validator = (message) => (name) => (
  value,
  allValues,
) => (
  value !== '' && allValues && allValues[name] !== '' && Number(value) > Number(allValues[name]) ? message : undefined
);

export const moreOrEqualThanValidator: Validator = (message) => (name) => (
  value,
  allValues,
) => (
  value !== '' && allValues && allValues[name] !== '' && Number(value) < Number(allValues[name]) ? message : undefined
);
