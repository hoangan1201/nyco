import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ScrollableAnchor, { configureAnchors, goToAnchor } from 'react-scrollable-anchor';
import { Waypoint } from 'react-waypoint';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';
import { getPageData } from '../actions/dataStory';
import {
  setModal,
  clearModal,
} from '../actions/modal';

import style from '../styles/data-story.scss';

import page from '../hocs/page';

import JumpNavigation from '../components/JumpNavigation';
import Card from '../components/Card';
import ProgramsCard from '../components/ProgramsCard';
import Loader from '../components/Loader';
// import ModalBackground from '../components/ModalBackground';
import BackButton from '../components/BackButton';
import { handleDownload } from '../utils/misc';
import CaptionCard from "../components/CaptionCard";
import Embed from "../components/Embed";

class DataStoryPage extends Component {
  static propTypes = {
    items: PropTypes.shape({}).isRequired,
    // pageData: PropTypes.shape({
    //   id: PropTypes.number,
    //   narrative_section: PropTypes.arrayOf(
    //     PropTypes.shape({
    //       id: PropTypes.number,
    //       order: PropTypes.number,
    //       title: PropTypes.string,
    //       description: PropTypes.string,
    //       data_story: PropTypes.number,
    //       sankey: PropTypes.number,
    //     }),
    //   ),
    //   created_at: PropTypes.string,
    //   updated_at: PropTypes.string,
    //   expire_date: PropTypes.string,
    //   pub_date: PropTypes.string,
    //   status: PropTypes.string,
    //   title: PropTypes.string,
    //   slug: PropTypes.string,
    //   description: PropTypes.string,
    //   icon: PropTypes.string,
    //   homepage_featured: PropTypes.bool,
    // }).isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.shape({
      isExact: PropTypes.bool,
      params: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }),
      path: PropTypes.string,
      url: PropTypes.string,
    }).isRequired,
    intl: PropTypes.shape({
      locale: PropTypes.string.isRequired,
    }).isRequired,
    isMobileView: PropTypes.bool.isRequired,
    translatedStrings: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);
    this.initialState = {
      // TODO: check, can we remove?
      modalIsOpen: false,
      expanded: false,
      currentActiveChartId: 0,
    };

    this.state = this.initialState;

    configureAnchors({
      offset: -100,
      scrollDuration: 200,
    });

    this.enterHandlers = {};
    this.leaveHandlers = {};
  }

  componentWillMount() {
    const {
      dispatch,
      match,
      items,
      intl,
    } = this.props;
    const { slug } = match.params;
    const { locale } = intl;
    this.slug = slug;

    if (slug && !items[slug]) {
      dispatch(getPageData({ slug, locale }));
    }
  }

  // componentWillUnmount() {
  //   document.body.style.overflowY = 'initial';
  // }

  handleModalClose = () => {
    const { dispatch } = this.props;
    dispatch(clearModal());
  }

  handleCardExpand = ({
    // id,
    type,
    data,
    categories,
    filename,
    csv,
    svg,
    title,
    description,
    // type, chartData, svg, csv, filename,
  }) => {
    // `type` will correspond to the *Modal component
    // currently ChartModal, TableModal and MapsModal
    const { dispatch } = this.props;
    const props = {
      data,
      categories,
      title,
      description,
      size: 'large',
      onClose: this.handleModalClose,
      filename,
      svg,
      csv,
      // svg: type === 'ChartModal' ? svg : null,
      // csv: type === 'TableModal' ? csv : null,
    };
    dispatch(setModal({
      type,
      props,
    }));
  }

  handleJump = ({ index }) => {
    goToAnchor(`section-${index}`, true);

    this.setState({
      ...this.state,
      modalIsOpen: false,
    });
  }

  handleToggleModal = ({ isOpen }) => {
    this.setState({
      ...this.state,
      modalIsOpen: !isOpen,
    });
  }

  handleWaypointEnter = ({ id }) => {
    if (this.enterHandlers[id]) {
      return this.enterHandlers[id];
    }

    this.enterHandlers[id] = ({ currentPosition, previousPosition }) => {
      if (currentPosition === 'inside' && previousPosition === 'above') {
        const newCurrentActiveChartId = Math.max(0, (id - 1));
        this.setState({
          ...this.state,
          currentActiveChartId: newCurrentActiveChartId,
        });
      }
    };

    return this.enterHandlers[id];
  }

  handleWaypointLeave = ({ id }) => {
    if (this.leaveHandlers[id]) {
      return this.leaveHandlers[id];
    }

    this.leaveHandlers[id] = ({ currentPosition, previousPosition }) => {
      if (currentPosition === 'above' && previousPosition === 'inside') {
        this.setState({
          ...this.state,
          currentActiveChartId: id,
        });
      }
    };

    return this.leaveHandlers[id];
  }

  getCard = ({
    type, id, section, activeChartId,
  }) => {
    const { translatedStrings } = this.props;
    if (type === 'map_chart') {
      const chartData = {
        title: section.chart.chart_config.title,
        description: section.chart.chart_config.description,
        shapefile: section.chart.shapefile,
        shapeFileCoordinates: section.chart.shapefile_coordinates,
        useDefaultMap: section.chart.use_default_map,
        categories: ['Name', section.chart.chart_config.tableColumn]
      };
      return (
        <ProgramsCard
          id={`chart-${id}`}
          isActive={activeChartId === id}
          locations={_.flatten(section.chart.coordinates)}
          onExpand={this.handleCardExpand}
          onDownload={handleDownload}
          chartData={chartData}
          translatedStrings={translatedStrings}

        />
      );
    }
    return (
      <Card
        id={`chart-${id}`}
        isActive={activeChartId === id}
        chartData={section.chart}
        onExpand={this.handleCardExpand}
        onDownload={handleDownload}
        isSankey={type === 'sankey'}
        translatedStrings={translatedStrings}
      />
    );
  }

  getCard2 = ({
    type, id, section, activeChartId,
  }) => {
    const { translatedStrings } = this.props;
    if (type === 'map_chart') {
      const chartData = {
        title: section.chart_config.title,
        description: section.chart_config.description,
        shapefile: section.shapefile,
        shapeFileCoordinates: section.shapefile_coordinates,
        useDefaultMap: section.use_default_map,
        categories: ['Geographic Name', section.chart_config.tableColumn]

      };
      return (
        <ProgramsCard
          id={`chart-${id}`}
          isActive={activeChartId === id}
          locations={_.flatten(section.coordinates)}
          onExpand={this.handleCardExpand}
          onDownload={handleDownload}
          chartData={chartData}
          translatedStrings={translatedStrings}

        />
      );
    }
    return (
      <Card
        id={`chart-${id}`}
        isActive={activeChartId === id}
        chartData={section}
        onExpand={this.handleCardExpand}
        onDownload={handleDownload}
        isSankey={type === 'sankey'}
        translatedStrings={translatedStrings}
      />
    );
  }

  render() {
    const {
      isMobileView,
      isFetching,
      items,
      intl,
      translatedStrings,
    } = this.props;    
    // sk: need to check if we don't have this content in our store
    if (isFetching || !items[this.slug]) {
      return <Loader />;
    }

    const { locale } = intl;
    const content = items[this.slug];
    const { contents } = content

    const { expanded, currentActiveChartId } = this.state;

    const orderedNarratives = _.orderBy(content.narrative_section, ['order'], ['asc']);
    const { title, description } = content.translations[locale];

    return (
      <div className={style.root}>
        <div className={style.margins}>
          <section className={style['data-story-content']}>
            <div className={style.textWrapper}>
              <BackButton
                label="Data Stories"
                url={`/${locale}/data-stories`}
              />
              <h1>{title}</h1>
            </div>
            <section>
              {description && (
                <div className={style.textWrapper}>
                  <p>{description}</p>
                </div>
              )}
            </section>
            <section>
            {
              contents.map((section, i) => {
                switch(section.type) {
                    case 'wysiwyg':
                      return (
                        <div key={i} className={style.textWrapper}>
                          {section.title && (<h2>{section.title}</h2>)}
                          {section.content && <div dangerouslySetInnerHTML={{__html:section.content}}/>}
                        </div>
                      );

                    case 'image':
                      return (
                        <div key={i} className={style.textWrapper}>
                          <CaptionCard
                            content={<img src={section.src} alt={section.alt}></img>}
                            caption={section.caption}
                          />
                        </div>
                      );

                    case 'embed':
                      return (
                        <div key={i} className={style.textWrapper}>
                          {section.title && (<h2>{section.title}</h2>)}
                          <Embed embedCode={section.embed_code} />
                        </div>
                      );

                  default:
                    return (
                      <div key={i} className={style.cardWrapper}>
                      {this.getCard2({type: section.chart_config.type, id: `chart-${i}`, activeChartId: `chart-${i}`, section})}
                      </div>
                    )
                  }
              })
            }
            </section>
          </section>
        </div>

        {/* <ModalBackground isOpen={modalIsOpen} /> */}
      </div>
    );
  }
}

const mapStateToProps = ({ dataStory }) => {
  const { isFetching, items } = dataStory;
  return {
    items,
    isFetching,
  };
};

export default compose(
  page({
    isDark: true,
  }),
  withStyles(style),
  connect(mapStateToProps),
)(DataStoryPage);
