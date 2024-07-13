import React from 'react'
import { NavLink } from 'react-router-dom';
import style from '../styles/components/logo.scss'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';

const Logo = ({ locale, ariaHidden }) => {
  return (
    <NavLink to={`/${locale}`} className={style.logo} exact id="main-header-logo" aria-hidden={ariaHidden}>
      <span>Workforce</span>
      {' '}
      <span>Data</span>
      {' '}
      <span>Portal</span>
    </NavLink>
  )
}

Logo.propTypes = {
  locale: PropTypes.string.isRequired
}

export default withStyles(style)(Logo);