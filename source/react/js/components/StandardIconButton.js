import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/standard-icon-button.scss';

const StandardIconButton = ({
  icon, label, onClick, onMouseOverOut, onFocus, onBlur, ariaExpanded, ariaChecked, ariaSelected, ariaControls, role
}) => (
  <button
    onClick={onClick}
    type="button"
    className={style.root}
    onMouseOver={() => onMouseOverOut({ label })}
    onMouseOut={() => onMouseOverOut({ label })}
    // TODO:
    onFocus={onFocus}
    onBlur={onBlur}
    aria-expanded={ariaExpanded}
    aria-checked={ariaChecked}
    aria-selected={ariaSelected}
    aria-controls={ariaControls}
    role={role}
  >
    <span className={style['svg-wrapper']}>
      {icon}
    </span>
    {label}
  </button>
);

StandardIconButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  onMouseOverOut: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  ariaExpanded: PropTypes.bool,
  ariaChecked: PropTypes.bool,
  ariaSelected: PropTypes.bool,
  ariaControls: PropTypes.string,
  role: PropTypes.string
};

StandardIconButton.defaultProps = {
  onClick: () => {},
  onMouseOverOut: () => {},
  onFocus: () => {},
  onBlur: () => {},
  ariaExpanded: false,
  ariaChecked: false,
  ariaSelected: false,
  ariaControls: null,
  role: "button"
};

export default withStyles(style)(StandardIconButton);
