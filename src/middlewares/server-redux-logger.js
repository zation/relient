const isDev = process.env.NODE_ENV !== 'production';

export default ({ logger = console } = {}) => () => next => (action) => {
  if (action.error) {
    logger.error(action);
  } else if (isDev) {
    logger.info(action.type);
  }

  return next(action);
};
