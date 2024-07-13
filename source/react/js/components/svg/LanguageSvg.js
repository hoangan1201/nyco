import React from 'react';
import PropTypes from 'prop-types';

// no longer an icon because rotated

const LanguageSvg = (props) => {
  const {
    fill,
    rotated,
  } = props;

  return (
    <svg
      preserveAspectRatio="xMidYMid meet"
      width="31"
      height="20"
      role="img"
      alt=""
    >
      <g fill="none" fillRule="evenodd">
        <path fill={fill} fillRule="nonzero" d="M11.443 12.987l-2.448-2.493.029-.03A17.545 17.545 0 0 0 12.6 3.978h2.825V1.987H8.676V0H6.748v1.987H0v1.976h10.768a15.797 15.797 0 0 1-3.056 5.324A15.687 15.687 0 0 1 5.485 5.96H3.557a17.505 17.505 0 0 0 2.873 4.53l-4.902 4.99 1.364 1.406 4.82-4.967 2.999 3.09.732-2.022zm6.364-5.35h-1.954l-4.398 11.726h1.954l1.1-2.932h4.642l1.1 2.932h1.954L17.807 7.636zm-2.565 6.84l1.588-4.236 1.588 4.236h-3.176z" />
        {rotated ? (
          <path stroke={fill} strokeWidth="2" d="M30.001 11.453l-2.728-2.728-2.727 2.728" />
        ) : (
          <path stroke={fill} strokeWidth="2" d="M24.545 8.727l2.728 2.728L30 8.727" />
        )}
      </g>
    </svg>
  );
};

LanguageSvg.propTypes = {
  fill: PropTypes.string,
  rotated: PropTypes.bool,
};

LanguageSvg.defaultProps = {
  fill: '#080707',
  rotated: false,
};

export default LanguageSvg;
