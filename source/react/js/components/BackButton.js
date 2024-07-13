import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/back-button.scss';
import ChevronDownIcon from './icons/ChevronDown';

const BackButton = ({ label, url }) => (
  <nav aria-label="Breadcrumb" className={style.root}>
    <NavLink to={url} exact>
      <span className={style.iconWrapper}>
        <ChevronDownIcon
          width={8}
          height={4}
        />
      </span>
      <span className={style.labelWrapper}>
        {label}
      </span>
    </NavLink>
  </nav>
);

BackButton.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default withStyles(style)(BackButton);
