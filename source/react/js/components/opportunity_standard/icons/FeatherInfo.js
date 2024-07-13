import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../Icon';

const FeatherInfoIcon = (props) => {
  const {
    fill,
  } = props;

  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <g stroke={fill} fill="none" fillRule="evenodd">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 16V12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8H12.01" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </Icon>
  );
};

FeatherInfoIcon.propTypes = {
  fill: PropTypes.string,
};

FeatherInfoIcon.defaultProps = {
  fill: '#3194E0',
};

export default FeatherInfoIcon;
