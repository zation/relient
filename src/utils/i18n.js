import { parse } from 'intl-messageformat-parser';
import { flow, map, prop, every, values as getValues, join, identity } from 'lodash/fp';

const MESSAGE_TEXT = 'messageTextElement';
const ARGUMENT = 'argumentElement';

export default messages => (messageKey, values) => {
  if (!messages) {
    throw new Error('Messages is required');
  }

  if (!messageKey) {
    throw new Error('messageKey is required');
  }

  return flow(
    prop(messageKey),
    parse,
    prop('elements'),
    map(({ type, value, id }) => {
      if (type === MESSAGE_TEXT) {
        return value;
      }
      if (type === ARGUMENT) {
        return values[id];
      }
      throw new Error(`Element type is not handled for: ${type}`);
    }),
    flow(getValues, every(value => typeof value === 'string'))(values) ? join('') : identity,
  )(messages);
};
