import React, { useState } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/common-metric-card.scss';
import Button from './opportunity_standard/Button';
import DownloadIcon from './opportunity_standard/icons/Download';
import Collapse from './opportunity_standard/Collapse';
import Menu from './opportunity_standard/Menu';
import { compose } from 'redux';

const CommonMetricCard = ({ title, description, cardContent, contentType, disclaimer, downloadCallback, notes, isExporting }) => {
  const [expandedDownload, setExpandedDownload] = useState(false);

  const onDownloadClick = (event, mimetype) => {
    event.preventDefault();
    setExpandedDownload(false);
    downloadCallback(mimetype);
  }

  const renderDownloadButton = () => {
    if (contentType === 'chart') {
      return (
        <div style={{ position: 'relative' }}>
          <Button
            label={!isExporting ? 'Download Chart' : 'Downloading...'}
            theme="dark"
            iconLeft={ <DownloadIcon size={22} /> }
            onClick={e => setExpandedDownload(!expandedDownload)}
            ariaExpanded={expandedDownload}
            isBlockOnMobile={ true }
            loading={isExporting}
            disabled={isExporting}
          />
          
          { expandedDownload &&
            <Menu theme="dark" isFloating={true} onClickOutside={e => setExpandedDownload(false)}>
              <a href="#" onClick={ e => onDownloadClick(e, 'image/svg+xml') }>SVG Vector Image</a>
              <a href="#" onClick={ e => onDownloadClick(e, 'image/png') }>PNG Image</a>
              <a href="#" onClick={ e => onDownloadClick(e, 'image/jpeg') }>JPEG Image</a>
              {/* Disabled untill pdf export server is up */}
              {/* <a href="#" onClick={ e => onDownloadClick(e, 'application/pdf') }>PDF File</a> */}
            </Menu>
          }
        </div>
      );
    } else if (contentType === 'table') {
      return (
        <Button
          label="Download Table"
          theme="dark"
          iconLeft={ <DownloadIcon size={22} /> }
          onClick={ e => onDownloadClick(e) }
          isBlockOnMobile={ true }
        />
      )
    }
  }

  return (
    <div className={style.commonMetricCard}>
      <div className={style.content}>
        <h3>
          { title }
        </h3>

        {/* Some descriptions have an empty paragraph at the end */}
        <span dangerouslySetInnerHTML={{ __html: description.replace('<p>&nbsp;</p>', '') }} /> 

        { disclaimer && 
          <p className={style.disclaimer}>
            *{ disclaimer }
          </p>
        }

        { renderDownloadButton() }

        <div className={`${style.chartContainer} ${contentType === 'table' ? style.hasTable : ''}`}>
          { cardContent }
        </div>

        { notes &&
          <Collapse label="Expand Data Notes" activeLabel="Close Data Notes" theme="dark">
            <span dangerouslySetInnerHTML={{ __html: notes }} />
          </Collapse>
        }
      </div>
    </div>
  )
}

CommonMetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  cardContent: PropTypes.node,
  contentType: PropTypes.string,
  disclaimer: PropTypes.string,
  downloadCallback: PropTypes.func,
  notes: PropTypes.string
};

CommonMetricCard.defaultProps = {
  downloadCallback: () => {}
}

const mapStateToProps = ({ highcharts }) => {
  const { isExporting } = highcharts;
  return {
    isExporting
  };
};

export default compose(
  withStyles(style),
  connect(mapStateToProps)
)(CommonMetricCard);