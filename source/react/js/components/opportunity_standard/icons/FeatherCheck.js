import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../Icon';

const FeatherCheckIcon = (props) => {
  const {
    fill,
  } = props;

  return (
    <Icon viewBox="0 0 22 22" {...props}>
      <g stroke={fill} fill="none" fillRule="evenodd">
        <path d="M18.3334 5.5L8.25002 15.5833L3.66669 11" stroke="#071F42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </Icon>
  );
};

FeatherCheckIcon.propTypes = {
  fill: PropTypes.string,
};

FeatherCheckIcon.defaultProps = {
  fill: '#3194E0',
};

export default FeatherCheckIcon;
