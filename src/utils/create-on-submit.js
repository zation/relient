import { reduce } from 'lodash/fp';
import { SubmissionError } from 'redux-form';

export default onSubmit => async (values, dispatch, props) => {
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
