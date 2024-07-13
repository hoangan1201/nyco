import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/modal-background.scss';

const ModalBackground = ({ isOpen }) => (
  <div className={`${style.root} ${isOpen ? style.open : ''}`} />
);

ModalBackground.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default withStyles(style)(ModalBackground);
