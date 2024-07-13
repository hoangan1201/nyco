import React from 'react';
import PropTypes from 'prop-types';

const Icon = (props) => {
  const {
    fill, size, children, ariaLabel, role, ...rest
  } = props;

  return (
    <svg preserveAspectRatio="xMidYMid meet" width={size} height={size} fill={fill} aria-label={ariaLabel} role={`${ariaLabel ? role : "presentation"}`} alt={`${ariaLabel ? ariaLabel : ``}`} {...rest}>
      {children}
    </svg>
  );
};

Icon.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
  ariaLabel: PropTypes.string,
  role: PropTypes.string
};

Icon.defaultProps = {
  fill: '#000000',
  size: '44px',
  ariaLabel: '',
  role: 'img'
};

export default Icon;
