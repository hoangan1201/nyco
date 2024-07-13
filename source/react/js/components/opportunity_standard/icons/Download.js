import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../Icon';

const DownloadIcon = (props) => {
  const {
    fill,
  } = props;

  return (
    <Icon viewBox={`0 0 24 24`} {...props}>
      <g stroke={fill} fill="none" fillRule="evenodd">
        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#C9E7FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 10L12 15L17 10" stroke="#C9E7FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 15V3" stroke="#C9E7FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
