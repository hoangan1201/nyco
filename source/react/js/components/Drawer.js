import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/drawer.scss';
import voiceoverStyle from '../styles/components/chart-voiceover.scss';
import ChevronDownIcon from './icons/ChevronDown';
import generateUniqueId from '../utils/misc';

const elementId = generateUniqueId({name: 'drawer'})

const Drawer = ({
  onClick,
  count,
  label,
  isOpen,
  children,
  // height,
}) => (
  <div className={style.root}>
    <h2>
      <button
        className={`${style.drawerButton} ${isOpen ? style.open : ''}`}
        type="button"
        // onClick={() => onClick({ index })}
        onClick={onClick}
        aria-controls={elementId}
        aria-expanded={isOpen}
        aria-describedby={`drawer-aria-description-${elementId}`}
      >
        <div className={style.count}>
          <span>{count}</span>
          <div className={style.line} />
        </div>
        <div className={style.label}>
          {label}
          <span className={style['icon-wrapper']}>
            <ChevronDownIcon
              fill={isOpen ? '#C9EEFE' : '#3194E0'}
              width={15}
              height={8}
            />
          </span>
        </div>

        <span
          id={`drawer-aria-description-${elementId}`}
          className={voiceoverStyle.srOnly}
        >
          This menu selects which metric to visualize.
        </span>
      </button>
    </h2>
    
    {isOpen && (
      <div className={style.content} id={elementId} aria-modal="true">
        {children}
      </div>
    )}
  </div>
);

Drawer.propTypes = {
  onClick: PropTypes.func.isRequired,
  count: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  // height: PropTypes.string.isRequired,
  // index: PropTypes.number.isRequired,
};

export default withStyles(style, voiceoverStyle)(Drawer);
