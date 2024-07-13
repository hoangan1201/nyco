import React, { Children, useRef } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../../styles/components/opportunity_standard/menu.scss'
import SelectChevronIcon from './icons/SelectChevron';
import { outsideClickListener } from '../../utils/forms';

const Menu = ({ children, isFloating, theme, onClickOutside }) => {
  const menuRef = useRef(null);
  outsideClickListener(menuRef, () => onClickOutside());

  return (
    <div className={`${style.menu} ${theme ? style[theme] : ''} ${isFloating ? style.isFloating : ''}`} ref={menuRef} role="menu">
      <div className={style.menuContent}>
        { Children.map(children, (child, i) => 
          <div key={i} role="menuitem">
            {child}
          </div>
        ) }
      </div>
    </div>
  )
}

Menu.propTypes = {
  theme: PropTypes.string,
  isFloating: PropTypes.bool,
  onClickOutside: PropTypes.func
};

Menu.defaultProps = {
  onClickOutside: e => {}
}

export default withStyles(style)(Menu);