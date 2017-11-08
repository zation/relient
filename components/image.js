import { isUndefined } from 'lodash/fp';
import { string, number, object } from 'prop-types';
import React from 'react';
import { compose, setPropTypes } from 'recompose';
import getAbsoluteUrl from '../utils/absolute-url';

export default compose(
  setPropTypes({
    src: string.isRequired,
    alt: string.isRequired,
    width: number,
    height: number,
    style: object,
  }),
)(({ src, width, height, alt, style, ...others }) => {
  let finalSrc = src;
  let extraStyle = {};
  if (!isUndefined(width) && !isUndefined(height)) {
    finalSrc += `?imageView2/1/w/${width}/h/${height}`;
    extraStyle = {
      width,
      height,
    };
  } else if (!isUndefined(width)) {
    finalSrc += `?imageView2/2/w/${width}`;
    extraStyle = {
      width,
    };
  } else if (!isUndefined(height)) {
    finalSrc += `?imageView2/2/h/${height}`;
    extraStyle = {
      height,
    };
  }

  return (
    <img
      src={getAbsoluteUrl(finalSrc)}
      alt={alt}
      style={{ ...extraStyle, ...style }}
      {...others}
    />
  );
});
