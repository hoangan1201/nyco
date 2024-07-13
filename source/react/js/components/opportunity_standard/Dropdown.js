import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../../styles/components/opportunity_standard/dropdown.scss'
import { outsideClickListener } from '../../utils/forms';
import SelectChevronIcon from './icons/SelectChevron';

// A dropdown field that displays children as its expanded content, and closes upon clicking out of the dropdown.
const Dropdown = ({ label, children, theme, showAsPopup, dropdownScrollOnOverflow, overrideExpanded }) => {
  const dropdownRef = useRef(null);
  const dropdownContentRef = useRef(null);
  
  if (showAsPopup) {
    outsideClickListener(dropdownRef, () => setIsExpanded(false));
  }

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (overrideExpanded !== null && overrideExpanded !== undefined) {
      setIsExpanded(overrideExpanded);
    }
  }, [overrideExpanded])

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      setIsExpanded(!isExpanded);
    }
  }

  // The dropdown content is positioned absolutely. If dropdownScrollOnOverflow is enabled, ensure the dropdown content
  // doesn't overflow beyond screen height, and if it does, force scroll behavior on it.
  // (useful for sticky sidebar filters where the user can't scroll further through document body)
  const checkContentOverflow = () => {
    if (!dropdownContentRef.current) return;

    const { height, top } = dropdownContentRef.current.getBoundingClientRect();
    const screenHeight = window.innerHeight;

    if ((height + top + 10) >= screenHeight) {
      // Cutoff at bottom of screen (with 10px padding) and make scrollable
      dropdownContentRef.current.style.height = `${screenHeight - top - 10}px`;
      dropdownContentRef.current.style.overflowY = 'scroll';
    } else {
      dropdownContentRef.current.style.height = '';
      dropdownContentRef.current.style.overflowY = '';
    }
  }

  useEffect(() => {
    if (!showAsPopup) return;

    if (isExpanded && dropdownScrollOnOverflow) {
      document.addEventListener('scroll', checkContentOverflow);
    }

    return () => {
      document.removeEventListener('scroll', checkContentOverflow);
      
      if (dropdownScrollOnOverflow) {
        checkContentOverflow();
      } else {
        if (dropdownContentRef.current) {
          dropdownContentRef.current.style.height = '';
          dropdownContentRef.current.style.overflowY = '';
        }
      }
    }
  }, [isExpanded, dropdownScrollOnOverflow])

  return (
    <div className={`${style.dropdown} ${ showAsPopup ? style.showAsPopup : ''} ${theme ? style[theme] : ''}`} ref={dropdownRef}>
      <div
        className={`${style.head} ${theme ? style[theme] : ''} ${isExpanded ? style.active : ''}`}
        onClick={e => setIsExpanded(!isExpanded)}
        tabIndex={0}
        aria-expanded={isExpanded}
        role="button"
        onKeyDown={showAsPopup ? onKeyDown : undefined}
      >
        { label }
        <SelectChevronIcon size={28} fill={'black'} />
      </div>

      { isExpanded &&
        <div className={style.dropdownContent} ref={dropdownContentRef}>
          { children }
        </div>
      }
    </div>
  )
}

Dropdown.propTypes = {
  label: PropTypes.string,
  showAsPopup: PropTypes.bool,
  dropdownScrollOnOverflow: PropTypes.bool,
  overrideExpanded: PropTypes.bool,
  theme: PropTypes.string
};

Dropdown.defaultProps = {
  defaultLabel: '',
  showAsPopup: true,
  dropdownScrollOnOverflow: false,
  theme: ''
}

export default withStyles(style)(Dropdown);