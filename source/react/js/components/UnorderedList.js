import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/unordered-list.scss';

const UnorderedList = ({ items }) => (
  <ul className={style.root}>
    {items.map(item => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

UnorderedList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
  ).isRequired,
};

export default withStyles(style)(UnorderedList);
