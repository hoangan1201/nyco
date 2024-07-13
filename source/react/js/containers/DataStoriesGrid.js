import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Waypoint } from 'react-waypoint';
import _ from 'lodash';


import SectionTitle from '../components/SectionTitle';
import DataStoryCard from '../components/DataStoryCard';
import DataStoryCardColumn from '../components/svg/DataStoryCardColumn';
import DataStoryCardDots from '../components/svg/DataStoryCardDots';
import DataStoryCardHistogram from '../components/svg/DataStoryCardHistogram';
import DataStoryCardBar from '../components/svg/DataStoryCardBar';
import DataStoryCardSankey from '../components/svg/DataStoryCardSankey';
import Loader from '../components/Loader';

import style from '../styles/containers/data-stories-grid.scss';

import { getDataStories } from '../actions/dataStories';

const svgMap = {
  Column: DataStoryCardColumn,
  Dots: DataStoryCardDots,
  Histogram: DataStoryCardHistogram,
  Bar: DataStoryCardBar,
  Sankey: DataStoryCardSankey,
};

class DataStoriesGrid extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        narrative_section: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number,
            order: PropTypes.number,
            title: PropTypes.string,
            description: PropTypes.string,
            data_story: PropTypes.number,
            sankey: PropTypes.number,
          }),
        ),
        created_at: PropTypes.string,
        updated_at: PropTypes.string,
        expire_date: PropTypes.string,
        pub_date: PropTypes.string,
        status: PropTypes.string,
        title: PropTypes.string,
        slug: PropTypes.string,
        description: PropTypes.string,
        icon: PropTypes.string,
        homepage_featured: PropTypes.bool,
      }),
    ).isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
    isHomepage: PropTypes.bool,
    isMobileView: PropTypes.bool.isRequired,
    colors: PropTypes.array.isRequired,
    translatedStrings: PropTypes.shape({}).isRequired,
    isTitleH1: PropTypes.bool
  };

  static defaultProps = {
    isHomepage: false,
    isTitleH1: false
  };

  constructor(props) {
    super(props);

    this.initialState = {
      cards: [],
    };

    this.state = this.initialState;
    this.enterHandlers = {};
  }

  componentWillMount() {
    const { dispatch, items, locale } = this.props;
    if (!items.length) {
      dispatch(getDataStories({ locale }));
    }
  }

  handleWaypointEnter = ({ id }) => {
    if (this.enterHandlers[id]) {
      return this.enterHandlers[id];
    }

    this.enterHandlers[id] = ({ currentPosition }) => {
      if (currentPosition === 'inside') {
        const { cards } = this.state;
        if (cards.indexOf(id) === -1) {
          this.setState({
            ...this.state,
            cards: cards.concat(id),
          });
        }
      }
    };

    return this.enterHandlers[id];
  }

  getDataStories = () => {
    // Function returning all data stories for a page.
    const { items, isHomepage, locale, colors } = this.props;
    const { cards } = this.state;
    const pageItems = isHomepage ?  _.filter(items, ['homepage_featured', true]) : items;

    return pageItems.map((item) => {
      if (item.public_status == 'P' || item.internal_status == 'P') {
        const SvgIcon = svgMap[item.icon];
        const description = item.translations[locale]['description'] ? item.translations[locale]['description'] : '';
        const title = item.translations[locale]['title'] ? item.translations[locale]['title'] : '';
      return (
        <Fragment key={item.slug}>
          <DataStoryCard
            title={title}
            text={description}
            icon={(
              <SvgIcon
                colors={colors} animate={cards.indexOf(item.slug) !== -1}
              />
            )}
            slug={item.slug}
            locale={locale}
          />
          <Waypoint
            scrollableAncestor={window}
            onEnter={this.handleWaypointEnter({ id: item.slug })}
            bottomOffset="30%"
          />
        </Fragment>
      );
      }
    });
  }

  render() {
    const {
      isFetching,
      items,
      isHomepage,
      locale,
      isMobileView,
      translatedStrings,
      isTitleH1
    } = this.props;

    if (isFetching) {
      return <Loader />;
    }
    return (
      <div id="data-stories" className={style.dataStoriesGrid}>
        <div className={style.titleWrapper}>
          <SectionTitle
            title={translatedStrings.data_story_title}
            text={translatedStrings.data_story_description}
            buttonLabel={isHomepage ? 'Explore all Data Stories' : null}
            buttonCTA={isHomepage ? `/${locale}/data-stories` : null}
            isMobileView={isMobileView}
            isH1={isTitleH1}
          />
        </div>
        <div className={style.stories}>
          {this.getDataStories()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ dataStories, pages }) => {
  const { isFetching, items } = dataStories;
  const { colors } = pages;
  return {
    items,
    colors,
    isFetching,
  };
};

export default compose(
  connect(mapStateToProps),
  withStyles(style),
)(DataStoriesGrid);
