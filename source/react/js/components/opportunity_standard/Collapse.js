import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../../styles/components/opportunity_standard/collapse.scss'
import ChevronDownIcon from '../icons/ChevronDown';
import ChevronUpIcon from '../icons/ChevronUp';

const Collapse = ({ label, activeLabel, children, theme }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const getLabel = () => {
    if (isExpanded && activeLabel) return activeLabel;

    return label;
  }

  return (
    <div className={`${style.collapse} ${theme ? style[theme] : ''}`}>
      <div
        className={`${style.head} ${theme ? style[theme] : ''} ${isExpanded ? style.active : ''}`}
        onClick={e => setIsExpanded(!isExpanded)}
        tabIndex={0}
        aria-expanded={isExpanded}
        role="button"
      >
        { getLabel() }
        
        { !isExpanded && <ChevronDownIcon size={12} fill={'black'} /> }
        { isExpanded && <ChevronUpIcon size={12} fill={'black'} /> }
      </div>

      { isExpanded &&
        <div className={style.collapseContent}>
          { children }
        </div>
      }
    </div>
  )
}

Collapse.propTypes = {
  label: PropTypes.string.isRequired,
  activeLabel: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default withStyles(style)(Collapse);