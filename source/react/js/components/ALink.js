import React from 'react';
import PropTypes from 'prop-types';

const ALink = ({ href, label, size }) => (
  <a className={size} href={href}>
    {label}
  </a>
);

ALink.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  size: PropTypes.string,
};

ALink.defaultProps = {
  size: 'normal',
};

export default ALink;
