import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from '../styles/components/breadcrumb.scss';

const Breadcrumb = ({ data }) => {
  if (!data || data.length === 0) {
    console.error("Breadcrumb data is empty or undefined.");
    return null; 
  }

  return (
      <div className={style.breadcrumb_nav}>
        {data.map((item, index) => {
          if (!item || !item.title || !item.path) {
            console.error("Breadcrumb item is missing title or path:", item);
            return null; // Avoid rendering undefined items
          }

          return (
            <div className = {style.nav_item} key={item.path}>
              <a href={item.path}>{item.title}</a>
              {index < data.length - 1 && <span className={style.arrow}> {'>'} </span>}
            </div>
          );
        })}
      </div>
  );
};

Breadcrumb.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  })).isRequired,
};

export default withStyles(style)(Breadcrumb);
