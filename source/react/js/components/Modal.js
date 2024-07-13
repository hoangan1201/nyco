import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';

import { generateUniqueId, handleDownload } from '../utils/misc';
import ModalBackground from './ModalBackground';
import CloseIcon from './icons/Close';
import ChartModal from './ChartModal';
import TableModal from './TableModal';
import AccordionModal from './AccordionModal';
import MapModal from './MapModal';
import CardFooterButtons from './CardFooterButtons';
import style from '../styles/components/modal.scss';

const modalMap = {
  ChartModal,
  TableModal,
  MapModal,
  AccordionModal,
  DataStoryMapModal: 'DataStoryMapModal',
  DataStoryMapTableModal: 'DataStoryMapTableModal',
};

class Modal extends Component {
  static propTypes = {
    id: PropTypes.string,
    type: PropTypes.oneOf(Object.keys(modalMap)),
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    csv: PropTypes.string,
    svg: PropTypes.string,
    filename: PropTypes.string,
    data: PropTypes.shape({}),
    categories: PropTypes.arrayOf(
      PropTypes.string,
    ),
    locations: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    title: PropTypes.string,
    description: PropTypes.string,
    size: PropTypes.oneOf([
      'small',
      'large',
    ]),
  };

  static defaultProps = {
    id: generateUniqueId({ name: 'modal' }),
    type: null,
    csv: null,
    svg: null,
    filename: null,
    data: null,
    categories: null,
    locations: null,
    size: 'small',
    title: null,
    description: null,
    chart: null,
  };

  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
    this.closeButtonRef = React.createRef();

    this.initialState = {
      currentChart: null,
      chart: null,
    };

    this.state = this.initialState;
  }

  componentDidUpdate(prevProps) {
    const { type } = this.props;
    if (prevProps.type !== type) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        ...this.state,
        currentChart: type,
      });
    }

    if (prevProps.isOpen) {
      // Focus on modal (screen readers)
      this.closeButtonRef.current.focus();
    }
  }

  generateCSV = ({ data }) => {
    let csv = 'Program name,Text,Contact Name,Contact Phone,Links,Lat. / Long.\n';

    data.forEach(({
      title,
      contentTitle,
      content,
      contacts,
      links,
      latLons,
    }) => {
      const contactNames = contacts.map(({ name }) => name);
      const contactPhones = contacts.map(({ phone }) => phone);
      const linkUrls = links.map(({ url }) => url);
      const positions = latLons.map(({ lat, lng }) => `${lat} / ${lng}`);
      csv += `"${title}","${contentTitle} ${content}","${contactNames}","${contactPhones}","${linkUrls}","${positions}"\n`;
    });

    return csv;
  };

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
  handleChartMount = ({ chart }) => {
      this.setState({
        ...this.state,
        chart,
      });
    }

  handleModalFooterButtonChange = ({ tabId, label, type }) => {
    const {
      filename,
      locations,
    } = this.props;
    const { currentChart, chart } = this.state;
    const csv = this.tableRef;
    const svg = true;
    let newChartType;
    let SVGData;
    let CSVData;
    switch (currentChart) {
      case 'MapModal':
        newChartType = 'AccordionModal';
        SVGData = svg;
        CSVData = null;
        break;
      case 'DataStoryMapModal':
        newChartType = 'DataStoryMapTableModal';
        SVGData = svg;
        CSVData = null;
        break;
      case 'DataStoryMapTableModal':
        newChartType = 'DataStoryMapModal';
        SVGData = svg;
        CSVData = null;
        break;
      case 'AccordionModal': {
        // console.log(locations);
        const locationsData = _.uniqBy(locations, 'title').map((
          {
            title,
            description,
            contact,
            programLink,
          },
        ) => ({
          title,
          contentTitle: title,
          content: description,
          contacts: contact,
          links: programLink,
        }));
        // console.log(locationsData);
        newChartType = 'MapModal';
        SVGData = null;
        CSVData = this.generateCSV({ data: this.generateProgramData(locations) });
        break;
      }
      case 'ChartModal':
        newChartType = 'TableModal';
        SVGData = svg;
        CSVData = null;
        break;
      case 'TableModal':
        newChartType = 'ChartModal';
        SVGData = null;
        CSVData = csv;
        break;
      default:
        newChartType = null;
    }

    if (tabId === 0) {
      this.setState({
        ...this.state,
        currentChart: newChartType,
      });
    } else if (tabId === 1) {
      if(SVGData === true) {
        chart.exportChart({
          type: type,
          filename: filename
        });
      } else {
        handleDownload({
          svg: SVGData,
          csv: csv,
          filename,
        });
      }
    }
  };

  render() {
    const {
      id,
      type,
      isOpen,
      onClose,
      data,
      categories,
      locations,
      title,
      description,
      size,
      filename
    } = this.props;
    const { currentChart, chart } = this.state;
    if (!currentChart) {
      return null;
    }
    const table = chart ? chart.getTable : null
    // console.log(this.props);

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
        footerLabels = ['View Map', 'Download This Chart'];
        break;
      case 'ChartModal':
        footerLabels = ['View Table', 'Download This Chart'];
        break;
      case 'TableModal':
        footerLabels = ['View Chart', 'Download This Table'];
        break;
      default:
        footerLabels = ['---', '---'];
    }

    // this is cobbled together for the Accordion
    let locationsData = locations
      // eslint-disable-next-line no-shadow
      ? locations.map(location => ({
        title: location.title,
        contentTitle: location.title,
        content: location.description,
        contacts: location.contact,
        links: location.programLink,
      }
      ))
      : null;
    if (type === 'AccordionModal') {
      locationsData = locations ? this.generateProgramData(locations) : null;
    }
    let mapTableModalData = {};
    if (data) {
      mapTableModalData = {
        ...data,
        series: data.series,
      };
    }

    return (
      <Fragment>
        <ModalBackground isOpen={isOpen} />
        <div id={id} className={`${style.root} ${isOpen ? style.open : ''}`}>
          <button
            type="button"
            onClick={onClose}
            className={style.modalClose}
            aria-label="Close expanded view"
            ref={this.closeButtonRef}
          >
            <CloseIcon size={20} />
          </button>
          <div className={style.modalContent} id={`${id}_content`} tabIndex={0}>
            {data && (type === 'ChartModal' || type === 'TableModal') && (
              <Fragment>
                <div className={`${style.chartContainer} ${currentChart === 'ChartModal' ? '' : style.hidden}`}>
                  <ChartModal
                    data={data}
                    size={size}
                    onMount={this.handleChartMount}
                  />
                </div>
                <div className={`${style.chartContainer} ${currentChart === 'ChartModal' ? style.hidden : ''}`}>
                  <TableModal
                    data={data}
                    categories={categories}
                    isSankey={data.series[0].type === 'sankey'}
                    table={chart}
                    tableRef={this.tableRef}

                  />
                </div>
              </Fragment>
            )}
            {data && (type === 'AccordionModal' || type === 'MapModal') && (
              <Fragment>
                <div className={`${style.chartContainer} ${currentChart === 'AccordionModal' ? '' : style.hidden}`}>
                  <AccordionModal
                    data={locationsData}
                    title={filename}
                  />
                </div>
                <div className={`${style.chartContainer} ${currentChart === 'MapModal' ? '' : style.hidden}`}>
                  <MapModal
                    data={data}
                    size={size}
                    title={title}
                    description={description}
                  />
                </div>
              </Fragment>
            )}
            {data && (type === 'DataStoryMapModal' || type === 'DataStoryMapTableModal') && (
              <Fragment>
                <div className={`${style.chartContainer} ${currentChart === 'DataStoryMapTableModal' ? '' : style.hidden}`}>
                  <TableModal
                    data={mapTableModalData}
                    categories={['lat', 'long', 'title']}
                    isMap
                    tableRef={this.tableRef}
                  />
                </div>
                <div className={`${style.chartContainer} ${currentChart === 'DataStoryMapModal' ? '' : style.hidden}`}>
                  <MapModal
                    data={data}
                    size={size}
                    title={title}
                    description={description}
                  />
                </div>
              </Fragment>
            )}
          </div>
          <div className={style.modalFooter}>
            <CardFooterButtons
              labels={footerLabels}
              onChange={this.handleModalFooterButtonChange}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(style)(Modal);
