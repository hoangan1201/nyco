import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from '../styles/components/navigation-menu.scss';
import ArrowRightIcon from './svg/ArrowRightIcon';
import useWindowSize from '../utils/useWindowSize';

const NavigationMenu = ({ isActive, navData, onChange }) => {
  const { width } = useWindowSize();
  const isMobileOrTablet = width <= 1024;

  return (
    <div className={classnames(style.navigationMenu, { [style.active]: isActive })}>
      {navData.map((navItem) => (
        <div key={navItem.url} className={style.navItem}>
          <a href={navItem.url} onClick={onChange}>
            {navItem.label}
            {isMobileOrTablet && <ArrowRightIcon className={style.arrowIcon} />}
          </a>
        </div>
      ))}
    </div>
  );
};


NavigationMenu.propTypes = {
  isActive: PropTypes.bool.isRequired,
  navData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withStyles(style)(NavigationMenu);
