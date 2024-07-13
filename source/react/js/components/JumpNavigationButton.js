import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/jump-navigation-button.scss';

const JumpNavigationButton = ({
  onClick, count, label, index,
}) => (
  <button
    className={`${style.root} ${style['jump-nav-item']}`}
    type="button"
    // onClick={onClick}
    onClick={() => onClick({ index })}
  >
    <div className={style.count}>
      {count}
    </div>
    <div className="text">
      {label}
    </div>
  </button>
);

JumpNavigationButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  count: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default withStyles(style)(JumpNavigationButton);
