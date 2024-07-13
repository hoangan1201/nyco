import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/ball-newton-cradle-loader.scss';

const BallNewtonCradleLoader = ({ size }) => (
  <div className={style.root}>
    <div className={classnames(
      style['la-ball-newton-cradle'],
      style[size] ? style[size] : '',
    )}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

BallNewtonCradleLoader.propTypes = {
  size: PropTypes.string,
};

export default withStyles(style)(BallNewtonCradleLoader);
