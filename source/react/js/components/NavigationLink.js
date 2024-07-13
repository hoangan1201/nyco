import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/navigation-link.scss';

import LinkOutIcon from './icons/LinkOut';
import LinkOut from "./icons/LinkOut";

const NavigationLink = ({
  url,
  label,
  isExternal,
}) => {
  const generateLink = () => {
    if (isExternal){
      return (<a target="_blank" href={url}>
      {label}
      <span className={style['svg-wrapper']}>
        <LinkOutIcon
          id="link-out-icon"
          size={11}
        />
      </span>
    </a>)
    }
    return <NavLink to={url}>
      {label}
      <span className={style['svg-wrapper']}>
        <LinkOutIcon
          id="link-out-icon"
          size={11}
        />
      </span>
    </NavLink>
  }
  return (
  <div className={style.root}>
    {generateLink()}
  </div>
)
};

NavigationLink.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isExternal: PropTypes.bool,
};

export default withStyles(style)(NavigationLink);
