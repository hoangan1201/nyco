import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/data-stories.scss';

import DataStoriesGrid from '../containers/DataStoriesGrid';

import page from '../hocs/page';


const DataStoriesPage = ({ intl, isMobileView, translatedStrings }) => {
  const { locale } = intl;
  return (
    <div className={style.root}>
      <div className={style.content}>
        <DataStoriesGrid
          locale={locale}
          isMobileView={isMobileView}
          translatedStrings={translatedStrings}
          isTitleH1={true}
        />
      </div>
    </div>
  );
};

DataStoriesPage.propTypes = {
  intl: PropTypes.shape({
    locale: PropTypes.string.isRequired,
  }).isRequired,
  isMobileView: PropTypes.bool.isRequired,
  translatedStrings: PropTypes.shape({}).isRequired,
};

export default compose(
  page(),
  withStyles(style),
)(DataStoriesPage);
