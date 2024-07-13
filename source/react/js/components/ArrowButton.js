import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/arrow-button.scss';

const ArrowButton = ({
  label,
  onClick,
  icon,
  withLine,
  small,
  ariaHidden
}) => {
  const rootStyle = classnames(
    style.root,
    { [style.small]: small },
  );

  const spanStyle = classnames(
    style.labelWrapper,
    { [style.preLine]: withLine },
  );

  return (
    <button
      onClick={onClick}
      type="button"
      className={rootStyle}
      aria-hidden={ariaHidden}
    >
      <span className={spanStyle}>
        {label}
      </span>
      <span className={style.svgWrapper}>
        {icon}
      </span>
    </button>
  );
};

ArrowButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  withLine: PropTypes.bool,
  small: PropTypes.bool,
  ariaHidden: PropTypes.bool,
};

ArrowButton.defaultProps = {
  onClick: () => {},
  withLine: false,
  small: false,
  ariaHidden: false
};

export default withStyles(style)(ArrowButton);
