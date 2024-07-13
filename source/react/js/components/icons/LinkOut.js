import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

const LinkOutIcon = (props) => {
  const {
    fill,
  } = props;

  return (
    <Icon viewBox="0 0 43 44" {...props}>
      <g stroke={fill} strokeWidth="5" fill="none" fillRule="evenodd">
        <path d="M39.592 35.228l-.354-31.466-31.466-.354M38.885 4.822l-36.77 36.77" />
      </g>
    </Icon>
  );
};

LinkOutIcon.propTypes = {
  fill: PropTypes.string,
};

LinkOutIcon.defaultProps = {
  fill: '#3194E0',
};

export default LinkOutIcon;
