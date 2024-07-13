import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from '../../styles/components/opportunity_standard/pill.scss';

const Pill = ({ label, isActive, icon, onClick, theme }) => {
  const pillClasses = [ style.pill ]
  if (theme) pillClasses.push(style[theme]);
  if (isActive) pillClasses.push(style.active);
  if (onClick) pillClasses.push(style.clickable);

  return (
    <div
      className={pillClasses.join(' ')}
      aria-selected={isActive}
      onClick={onClick ? onClick : () => {}}
    >
      <div className={style.label}>
        {label}
      </div>

      { icon && 
        <div className={style.iconContainer}>
          {icon}
        </div>
      }
    </div>
  )
}

Pill.propTypes = {
  label: PropTypes.string,
  isActive: PropTypes.bool,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  theme: PropTypes.string
}

Pill.defaultProps = {
  isActive: false
}

export default withStyles(style)(Pill);