import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';

import style from '../styles/components/card.scss';

import Chart from './Chart';
import ExpandIcon from './icons/Expand';
import CardFooterButtons from './CardFooterButtons';
import CategoryFiltering from './CategoryFiltering';
import { setLabels } from '../utils/misc';
import MapsChartData from '../data/MapsChartData';
import MapsShapeData from '../data/MapsShapeData';
import Pill from './Pill';
import AccordionModal from './AccordionModal'
import TableModal from './TableModal';

import newYork from '../data/ny';

class ProgramsCard extends Component {
  static propTypes = {
    onExpand: PropTypes.func,
    onDownload: PropTypes.func,
    id: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    isFromProgramPage: PropTypes.bool,
    isMobileView: PropTypes.bool,
    // chartData: PropTypes.shape({}).isRequired,
    filterData: PropTypes.shape({
      agency: PropTypes.array,
      average_yearly_clients: PropTypes.array,
      populations_served: PropTypes.array,
      program_types: PropTypes.array,
    }),
    locations: PropTypes.arrayOf(
      PropTypes.shape({
        latitude: PropTypes.string,
        longitude: PropTypes.string,
        title: PropTypes.string,
        tooltip_content: PropTypes.string,
      }),
    ).isRequired,
    locationDescriptions: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
      }),
    ),
    chartData: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
    translatedStrings: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    onExpand: null,
    onDownload: null,
    isMobileView: false,
    isFromProgramPage: false,
    filterData: {
      agency: [],
      average_yearly_clients: [],
      populations_served: [],
      program_types: [],
    },
    locationDescriptions: [
      {
        name: '',
        description: '',
      }],
    chartData: {
      title: '',
      description: '',
    },
  };

  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
    this.translatedStrings = {
      operating_location: 'Operating Location',
      average_yearly_clients: 'Average Yearly Clients',
      populations_served: 'Populations Served',
      program_types: 'Program Types',
      agency: 'Agency',
    };

    const programFilteringData = {};
    if (props.isFromProgramPage) {
      Object.keys(props.filterData).forEach((d) => {
        // 1. flatten the values
        // 2. get unique and remove any ""
        // 3. add (map) key value pair based on name (and index?)
        // 4. use the translated string as the key for the programFilteringData
        programFilteringData[this.translatedStrings[d]] = _.uniq(
          _.flatten(
            props.filterData[d],
          ),
        ).filter(n => n)
          .map((o, i) => ({
            [`${o}_${i}`]: o,
          }));
      });
    }

    this.initialState = {
      programFilteringData,
      over: false,
      currentChart: props.isFromProgramPage ? 'MapModal' : 'DataStoryMapModal',
      isDetailOpen: false,
      title: '',
      description: '' ,
      labels: setLabels({ data: programFilteringData, selected: false }),
    };

    this.state = this.initialState;
  }

  componentWillMount() {
    const { locations, isFromProgramPage, chartData } = this.props;
    const map = {
      latitude: 'lat',
      longitude: 'lon',
    };

    const clickHandler = isFromProgramPage ? this.handleMapClick : null;
    const shapeFileMap = chartData.shapefile;
    const categories = chartData.categories;
    let options;
    if (shapeFileMap) {
      const mapData = chartData.shapefile;
      const { useDefaultMap } = chartData;
      const shapefileCoordinates = _.map(chartData.shapeFileCoordinates, (coord) => {
        return {
          'hc-key': coord.hckey,
          title: coord.title,
          tooltip_content: coord.tooltip_content,
        };
      });
      options = MapsShapeData.config({
        mapData,
        shapefileCoordinates,
        useDefaultMap,
        categories
      });
    } else {
      options = MapsChartData.config({
        mapData: newYork,
        locations: locations.map(o => this.reKey({ o, map })),
        clickHandler,
      });
    }

    this.setState({
      ...this.state,
      options,
    });
  }


  // TODO: Make this more DRY -- see Card.js
  handleCardFooterButtonChange = ({ tabId, label, type  }) => {
    const {
      // locationDescriptions,
      onDownload,
      onExpand,
      // id,
      isFromProgramPage,
    } = this.props;
    const { chart, options, currentChart } = this.state;
    // const { locations } = this.props;
    const filename = 'Programs Locations';
    // const { name, description } = locationDescriptions[0];
    // const csv = chart.getCSV();
    // const svg = chart.getSVG();

    // const modalType = isFromProgramPage ? 'AccordionModal' : 'DataStoryMapTableModal';
    // tabId 0 === view table
    if (onExpand && tabId === 0) {
      let newCurrentChart = currentChart === 'MapModal' ? 'AccordionModal' : 'MapModal';

      if(!isFromProgramPage) {
        newCurrentChart = currentChart === 'DataStoryMapModal' ? 'DataStoryMapTableModal' : 'DataStoryMapModal';
      }

      this.setState({ ...this.state, currentChart: newCurrentChart });
    } else if (onDownload && tabId === 1) {
      if(currentChart === 'MapModal' || currentChart === 'DataStoryMapModal'){
        chart.exportChart({
          type: type,
          filename: filename
        });
      } else {
        onDownload({ csv:this.tableRef, filename });
      }
    }
  }

  // TODO: Make this more DRY -- see Card.js
  handleChartMount = ({ chart }) => {
    this.setState({
      ...this.state,
      chart,
    });
  }

  reKey = ({ o, map }) => {
    const ret = {};
    _.each(o, (value, key) => {
      const k = map[key] || key;
      ret[k] = map[key] ? Number(value) : value;
    });
    return ret;
  }

  onSelect = ({ labels }) => {
    const filterOptions = {
      operating_location: [],
      agency: [],
      average_yearly_clients: [],
      populations_served: [],
      program_types: [],
    };
    labels.forEach((item) => {
      const categoryLabel = Object.keys(this.translatedStrings)
        .find(key => this.translatedStrings[key] === item.label);
      filterOptions[categoryLabel] = item.children.map(({ label, selected }) => {
        if (selected) {
          return label;
        }
        return null;
      }).filter(n => n);
    });
    this.setState({
      ...this.state,
      filterOptions,
    }, () => { this.programFiltering(); });
  };

  programFiltering = () => {
    const { locations, isFromProgramPage } = this.props;
    const { filterOptions } = this.state;
    const operatingLocation = filterOptions.operating_location;
    const averageYearlyClients = filterOptions.average_yearly_clients;
    const populationsServed = filterOptions.populations_served;
    const programTypes = filterOptions.program_types;
    const { agency } = filterOptions;
    const filteredLocations = locations.map((programLocation) => {
      const { filters } = programLocation;
      // filters by programs, and relationship between the fil
      if (
        (filters.neighborhoods.some(r => operatingLocation.indexOf(r) >= 0)
        || operatingLocation.length === 0)
        && (filters.average_yearly_clients.some(r => averageYearlyClients.indexOf(r) >= 0)
        || averageYearlyClients.length === 0)
        && (filters.populations_served.some(r => populationsServed.indexOf(r) >= 0)
        || populationsServed.length === 0)
        && (filters.program_types.some(r => programTypes.indexOf(r) >= 0)
        || programTypes.length === 0)
        && (filters.agency.some(r => agency.indexOf(r) >= 0)
        || agency.length === 0)
      ) {
        return programLocation;
      }
      return null;
    }).filter(n => n);
    const map = {
      latitude: 'lat',
      longitude: 'lon',
    };

    let clickHandler = this.handleMapClick;
    if (!isFromProgramPage) {
      clickHandler = null;
    }
    const options = MapsChartData.config({
      mapData: newYork,
      locations: filteredLocations.map(o => this.reKey({ o, map })),
      clickHandler,
    });

    this.setState({
      ...this.state,
      options,
    });
  }

  handleMapClick = ({ point }) => {
    const {
      // id,
      onExpand,
      locations,
      locationDescriptions,
      isFromProgramPage,
      chartData,
    } = this.props;

    const { chart, options, currentChart, isDetailOpen } = this.state;
    if (onExpand) {
      const filename = 'Programs Locations';
      let title;
      let description;
      if (isFromProgramPage) {
        ({ title } = point);
        ({ description } = _.find(locationDescriptions, { name: title }));
      } else {
        ({ title, description } = chartData);
      }

      if(currentChart === 'MapModal'){
        this.setState(
          { ...this.state, isDetailOpen: true, title: title, description: description },
          () => chart.reflow()
        );
      }
    }
  }

  handleExpand = () => {
    const {
      onExpand, isFromProgramPage, chartData, locations,
    } = this.props;
    const { title, description } = chartData;
    const { chart, options } = this.state;
    if (isFromProgramPage) {
      return null;
    }
    if (onExpand) {
      const csv = chart.getCSV();
      const svg = chart.getSVG();
      const filename = chartData.title;

      onExpand({
        // id,
        type: 'DataStoryMapModal',
        data: options,
        locations,
        title,
        description,
        filename,
        csv,
        svg,
      });
    }
    return null;
  };

  onMouseOver = () => {
    this.setState({
      ...this.state,
      over: true,
    });
  }

  onMouseOut = () => {
    this.setState({
      ...this.state,
      over: false,
    });
  }

  generateProgramData = (data) => {
    const uniquePrograms = {};
    data.forEach((
      {
        title,
        description,
        contact,
        programLink,
        latitude,
        longitude,
      },
    ) => {
      if (uniquePrograms[title]) {
        uniquePrograms[title].latLons.push({
          lat: latitude,
          lng: longitude,
        });
      } else {
        uniquePrograms[title] = {
          title,
          contentTitle: title,
          content: description,
          contacts: contact,
          links: programLink,
          latLons: [{
            lat: latitude,
            lng: longitude,
          }],
        };
      }
    });
    return _.values(uniquePrograms);
  };

  handlePillClick = (id) => {
    const { onChange } = this.props;
    const { labels } = this.state;

    const newLabels = labels.map((item) => {
      return {
        ...item,
        children: item.children.map((child) => {
          if(child.value == id){
            return {
              ...child,
              selected: !child.selected
            }
          } else {
            return child;
          }
        })
      }
    })

    const filterOptions = {
      operating_location: [],
      agency: [],
      average_yearly_clients: [],
      populations_served: [],
      program_types: [],
    };

    newLabels.forEach((item) => {
      const categoryLabel = Object.keys(this.translatedStrings).find(key => this.translatedStrings[key] === item.label);
      filterOptions[categoryLabel] = item.children.map(({ label, selected }) => {
        if (selected) {
          return label;
        }
        return null;
      }).filter(n => n);
    });

    this.setState(
      { ...this.state, filterOptions, labels: newLabels, },
      () => this.programFiltering()
    );
  }

  render() {
    const {
      // id,
      isActive,
      locations,
      isMobileView,
      isFromProgramPage,
      translatedStrings,
      filterData,
      chartData,
    } = this.props;

    const {
      programFilteringData,
      options,
      over,
      labels,
      currentChart,
      isDetailOpen,
      title,
      description,
    } = this.state;

    const cardStyle = classnames(
      style.card,
      style.sticky,
      { [style.active]: isActive },
      { [style.over]: over },
    );

    const wrapperStyle = classnames(
      style.chartWrapper,
      style.map,
    );

    let footerLabels;
    switch (currentChart) {
      case 'DataStoryMapModal':
        footerLabels = ['View Table', 'Download This Map'];
        break;
      case 'DataStoryMapTableModal':
        footerLabels = ['View Map', 'Download This Table'];
        break;
      case 'MapModal':
        footerLabels = ['View Programs List', 'Download This Map'];
        break;
      case 'AccordionModal':
        footerLabels = ['View Map', 'Download This Table'];
        break;
      default:
        footerLabels = ['---', '---'];
    }
    const locationsData = locations ? this.generateProgramData(locations) : null;
    const filename = 'Programs Locations';

    let mapTableModalData = {};
    if (options) {
      mapTableModalData = {
        ...options,
        series: options.series,
        title: {
          wdpTitle:chartData.title
        },
        chartDescription: chartData.description
      };
    }

    return (
      <div className={style.root}>
        {isFromProgramPage && (<>
          <section className={style.filters}>
            <div className={style.filteringWrapper}>
              <CategoryFiltering
                leftAlign
                isCheckboxLabel={false}
                onSelect={this.onSelect}
                labels={labels}
                translatedStrings={translatedStrings}
                labelType={1}
              />
            </div>
          </section>
          <section className={style.pills}>
            {labels.map(({children}) => {
                return children.map(({label, selected, value}) => {
                  if(selected === true){
                    return <Pill
                      key={value}
                      onClick={this.handlePillClick}
                      label={label}
                      id={value}
                    />
                  }
                });
              })
            }
          </section>
        </>)}
        <div className={cardStyle}>
          <div className={style.shadowWrapper}>
            <div className={wrapperStyle}>
              {isFromProgramPage ? (
                <div className={style.chartMargins}>
                  <div className={`${style.chartContainer} ${isDetailOpen ? '' : style.centermap} ${currentChart === 'MapModal' ? '' : style.hidden}`}>
                    <div className={`${style.meta} ${isDetailOpen ? '' : style.hidden}`}>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
                    <div className={`${style.rightWrapper} ${isDetailOpen ? '' : style.fullwidth}`}>
                      <Chart
                        isMap
                        size="medium"
                        data={options}
                        onMount={this.handleChartMount}
                      />
                    </div>
                  </div>
                  {locationsData && (
                    <div className={`${style.tableContainer} ${currentChart === 'AccordionModal' ? '' : style.hidden}`}>
                      <AccordionModal
                        data={locationsData}
                        title={filename ? filename : 'test'}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className={style.chartMargins}>
                  <div className={`${style.chartContainer} ${currentChart === 'DataStoryMapModal' ? '' : style.hidden}`}>
                    <div className={`${style.meta} ${chartData.title ? '' : style.hidden}`}>
                      <h3>{chartData.title}</h3>
                      <p>{chartData.description}</p>
                    </div>
                    <div className={`${style.rightWrapper} ${chartData.title ? '' : style.fullwidth}`}>
                      <Chart
                        isMap
                        size="medium"
                        data={options}
                        onMount={this.handleChartMount}
                      />
                    </div>
                  </div>
                  <div className={`${style.tableContainer} ${currentChart === 'DataStoryMapTableModal' ? '' : style.hidden}`}>
                    <TableModal
                      data={mapTableModalData}
                      categories={chartData.categories}
                      isMap={true}
                      tableRef={this.tableRef}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          {!isMobileView && (
            <CardFooterButtons
              labels={footerLabels}
              onChange={this.handleCardFooterButtonChange}
            />
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(style)(ProgramsCard);
