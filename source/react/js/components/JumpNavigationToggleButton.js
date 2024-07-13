import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import ChevronDownIcon from './icons/ChevronDown';
import style from '../styles/components/jump-navigation-toggle-button.scss';

const JumpNavigationToggleButton = ({
  onClick,
  count,
  label,
  isOpen,
}) => (
  <button
    // className={`${isOpen ? 'open' : ''}`}
    className={`${style.root} ${isOpen ? style.open : ''}`}
    type="button"
    // onClick={() => onClick({ index })}
    onClick={onClick}
  >
    <div className={style.count}>
      <span>{count}</span>
      <div className={style.line} />
    </div>
    <div className={style.label}>
      {label}
      <span className={style['icon-wrapper']}>
        <ChevronDownIcon
          fill={isOpen ? '#C9EEFE' : '#3194E0'}
          width={15}
          height={8}
        />
      </span>
    </div>
  </button>
);

JumpNavigationToggleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  count: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  // index: PropTypes.number.isRequired,
};

export default withStyles(style)(JumpNavigationToggleButton);
