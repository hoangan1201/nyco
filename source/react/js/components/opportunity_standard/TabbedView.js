import React, { Children, useRef, useState } from 'react';
import PropTypes, { element } from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from '../../styles/components/opportunity_standard/tabbed-view.scss'
import generateUniqueId from '../../utils/misc';

// Simple tabbed view; tab labels are defined by a prop, and tab content by children
const TabbedView = (props) => {
  const children = Children.toArray(props.children);

  const isTabActive = (tabIndex) => props.activeTab == tabIndex

  const elementId = generateUniqueId({ name: 'tabbed-view' })

  return (
    <div className={`${style.tabbedView} ${props.theme ? style[props.theme] : ''}`}>
      <div className={style.heading} role="tablist">
        { props.labels.map((label, tabIndex) => 
          <button
            className={`${style.tabButton} ${isTabActive(tabIndex) ? style.active : ''}`}
            onClick={e => props.onTabChange(tabIndex)}
            key={tabIndex}
            role="tab"
            aria-selected={isTabActive(tabIndex)}
            aria-controls={`${elementId}-tab-${tabIndex}`}
          >
            <label onClick={e => props.onTabChange(tabIndex)}>{ label }</label>
          </button>
        ) }
      </div>

      { children.map((tabContent, tabIndex) => 
        <div key={tabIndex} role="tabpanel" id={`${elementId}-tab-${tabIndex}`}>
          { isTabActive(tabIndex) &&
            <div className={style.tabContent}>
              { tabContent }
            </div>
          }
        </div>
      ) }
    </div>
  )
}

TabbedView.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeTab: PropTypes.number,
  onTabChange: PropTypes.func,
};

TabbedView.defaultProps = {
  activeTab: 0,
  onTabChange: (val) => {}
}

export default withStyles(style)(TabbedView);