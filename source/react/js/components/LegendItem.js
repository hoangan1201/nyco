import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/legend-item.scss';

const LegendItem = ({ label, color }) => (
  <li className={style.root}>
    <div
      className={style.box}
      style={{
        backgroundColor: color,
      }}
    />
    {label}
  </li>
);

LegendItem.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default withStyles(style)(LegendItem);
