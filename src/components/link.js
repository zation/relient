import React from 'react';
import { string, node, func, bool } from 'prop-types';
import { propEq, omit } from 'lodash/fp';
import { connect } from 'react-redux';
import { compose, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import { push as pushAction, goBack as goBackAction } from '../actions/history';

const isLeftClickEvent = propEq('button', 0);

const isModifiedEvent = ({ metaKey, altKey, ctrlKey, shiftKey }) =>
  !!(metaKey || altKey || ctrlKey || shiftKey);

export default compose(
  connect(null, { push: pushAction, goBack: goBackAction }),
  setDisplayName(__filename),
  setPropTypes({
    to: string,
    children: node.isRequired,
    onClick: func,
    back: bool,
    goBack: func.isRequired,
  }),
  withHandlers({
    handleClick: ({ onClick, to, push, target, goBack, back = false }) => (event) => {
      if (back) {
        event.preventDefault();
        goBack();
      }
      if (onClick && onClick(event) === false) {
        event.preventDefault();
        return;
      }
      if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
        return;
      }

      if (event.defaultPrevented === true || target === '_blank') {
        return;
      }

      event.preventDefault();
      push(to);
    },
  }),
)(({ to, children, handleClick, ...props }) => (
  <a href={to} {...omit(['push', 'back', 'goBack'])(props)} onClick={handleClick}>{children}</a>
));
