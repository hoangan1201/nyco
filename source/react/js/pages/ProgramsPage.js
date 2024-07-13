import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';

import { getPrograms } from '../actions/programs';
import {
  setModal,
  clearModal,
} from '../actions/modal';

import style from '../styles/data-story.scss';

import page from '../hocs/page';

import ProgramsCard from '../components/ProgramsCard';
import Loader from '../components/Loader';
import BackButton from '../components/BackButton';
import { handleDownload } from '../utils/misc';

class ProgramsPage extends Component {
  static propTypes = {
    locations: PropTypes.arrayOf(
      PropTypes.array,
    ).isRequired,
    locationDescriptions: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
      }),
    ).isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({}),
    ).isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.shape({
      isExact: PropTypes.bool,
      params: PropTypes.shape({
        program: PropTypes.string,
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
      // isVisible: false,
      currentActiveChartId: 0,
    };

    this.state = this.initialState;

    this.enterHandlers = {};
    this.leaveHandlers = {};
  }

  componentWillMount() {
    const {
      dispatch,
      match,
      intl,
    } = this.props;
    const { program } = match.params;
    const { locale } = intl;
    this.program = program;
    dispatch(getPrograms({ locale }));
  }

  handleModalClose = () => {
    const { dispatch } = this.props;
    dispatch(clearModal());
  }

  handleExpand = ({
    // id,
    type,
    data,
    locations,
    filename,
    csv,
    svg,
    description,
    title,
  }) => {
    // `type` will correspond to the *Modal component
    const { dispatch } = this.props;

    const props = {
      data,
      locations,
      description,
      title,
      size: 'large',
      onClose: this.handleModalClose,
      filename,
      svg,
      csv,
    };

    dispatch(setModal({
      type,
      props,
    }));
  }

  render() {
    const {
      isMobileView,
      isFetching,
      items,
      intl,
      locations,
      locationDescriptions,
      translatedStrings,
      introduction,
    } = this.props;

    if (isFetching) {
      return <Loader />;
    }

    const { locale } = intl;

    const filterData = {
      operating_location: [],
      average_yearly_clients: [],
      populations_served: [],
      program_types: [],
      agency: [],
    };

    items.forEach((pgm) => {
      filterData.agency.push(pgm.agency);
      filterData.average_yearly_clients.push(pgm.filter_categories.average_yearly_clients);
      filterData.populations_served.push(_.flatten(pgm.filter_categories.populations_served));
      filterData.program_types.push(_.flatten(pgm.filter_categories.program_types));
      filterData.operating_location.push(_.flatten(pgm.filter_categories.neighborhoods));
    });

    return (
      <div className={style.root}>
        <div className={style.margins}>
          <section className={style['data-story-content']}>
            <div className={style.textWrapper}>
              <BackButton
                label="Data Stories"
                s
                url={`/${locale}/data-stories`}
              />
              <h1>Programs</h1>
            </div>
            <section>
              <div className={style.textWrapper}>
                {items[0].page_description} 
                <p>{introduction}</p>
              </div>
            </section>
            <section>
              <div className={style.cardWrapper}>
                <ProgramsCard
                  onExpand={this.handleExpand}
                  id="maps-chart"
                  isActive
                  isMobileView={isMobileView}
                  onDownload={handleDownload}
                  filterData={filterData}
                  locations={_.flatten(locations)}
                  locationDescriptions={locationDescriptions}
                  isFromProgramPage
                  translatedStrings={translatedStrings}
                />
                {items[0].page_description && <p className={style.cardCaption}>{items[0].page_description}</p>}
              </div>
            </section>
          </section>
        </div>

        {/* <ModalBackground isOpen={modalIsOpen} /> */}
      </div>
    );
  }
}

const mapStateToProps = ({ programs }) => {
  const {
    isFetching, items, locations, locationDescriptions, introduction
  } = programs;
  return {
    items,
    locations,
    locationDescriptions,
    isFetching,
    introduction,
  };
};

export default compose(
  page({
    isDark: true,
  }),
  withStyles(style),
  connect(mapStateToProps),
)(ProgramsPage);
