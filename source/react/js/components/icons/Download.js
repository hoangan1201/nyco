import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

const DownloadIcon = (props) => {
  const {
    fill,
  } = props;

  return (
    <Icon viewBox="0 0 60 60" {...props}>
      <g fill="none" fillRule="evenodd">
        <g stroke={fill} strokeWidth="5" transform="translate(11 2)">
          <polyline stroke={fill} points="0 21.895 16 37.474 32 21.895" />
          <path stroke={fill} d="M16,37.0526316 L16,0" />
        </g>
        <polyline stroke={fill} strokeWidth="5" points="2 36 2 57 52 57 52 36" />
      </g>
    </Icon>
  );
};

DownloadIcon.propTypes = {
  fill: PropTypes.string,
};

DownloadIcon.defaultProps = {
  fill: '#3194E0',
};

export default DownloadIcon;
