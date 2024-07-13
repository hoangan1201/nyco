import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../Icon';

const PersonIcon = (props) => {
  const {
    fill,
  } = props;

  return (
    <Icon viewBox={`0 0 55 55`} {...props}>
      <circle cx="27.74" cy="27.1404" r="26.2615" fill="white"/>
      <path d="M24.1407 54.1211L34.213 53.0419L43.2066 48.3652L11.9902 48.1853L17.3049 51.9626L24.1407 54.1211Z" fill="#003C7A"/>
      <path d="M43.2104 48.6084C43.2104 44.4103 41.5427 40.3842 38.5742 37.4157C35.6058 34.4472 31.5796 32.7795 27.3816 32.7795C23.1835 32.7795 19.1574 34.4472 16.1889 37.4157C13.2204 40.3842 11.5527 44.4103 11.5527 48.6084" fill="#003C7A"/>
      <path d="M43.2104 48.6084C43.2104 44.4103 41.5427 40.3842 38.5742 37.4157C35.6058 34.4472 31.5796 32.7795 27.3816 32.7795C23.1835 32.7795 19.1574 34.4472 16.1889 37.4157C13.2204 40.3842 11.5527 44.4103 11.5527 48.6084" stroke="#003C7A" fill="transparent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27.3807 32.7758C33.2087 32.7758 37.9332 28.0512 37.9332 22.2232C37.9332 16.3952 33.2087 11.6707 27.3807 11.6707C21.5527 11.6707 16.8281 16.3952 16.8281 22.2232C16.8281 28.0512 21.5527 32.7758 27.3807 32.7758Z" fill="#003C7A" stroke="#003C7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27.3814 53.8805C41.9514 53.8805 53.7628 42.0691 53.7628 27.4991C53.7628 12.929 41.9514 1.11768 27.3814 1.11768C12.8113 1.11768 1 12.929 1 27.4991C1 42.0691 12.8113 53.8805 27.3814 53.8805Z" fill="transparent" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  );
};

PersonIcon.propTypes = {
  fill: PropTypes.string,
};

PersonIcon.defaultProps = {
  fill: '#3194E0',
};

export default PersonIcon;
