import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

const ArrowRightIcon = (props) => {
  const {
    fill,
  } = props;

  return (
    <Icon viewBox="0 0 57 49" {...props}>
      <g stroke={fill} strokeWidth="5" fill="none" fillRule="evenodd">
        <path d="M31 47l22-22.5L31 2M52 25H0" />
      </g>
    </Icon>
  );
};

ArrowRightIcon.propTypes = {
  fill: PropTypes.string,
};

ArrowRightIcon.defaultProps = {
  fill: '#3194E0',
};

export default ArrowRightIcon;
