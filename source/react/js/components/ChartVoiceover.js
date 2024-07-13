import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from '../styles/components/chart-voiceover.scss'
import ChartVoiceoverService from '../utils/chartVoiceoverService';


const ChartVoiceover = ({ data, distributionView, forceChartDescription }) => {
  const service = new ChartVoiceoverService(data, distributionView, forceChartDescription);
  service.buildFromChartData();

  const debugVoiceoverView = () => {
    return (new URLSearchParams(window.location.search)).get('debug_voiceover') == 'true'
  }

  return (
    <span>
      <div className={style.srOnly} aria-label="Transcription of the chart">
        <span dangerouslySetInnerHTML={{ __html: service.htmlString }} />
      </div>

      {debugVoiceoverView() && <code>{service.htmlString}</code>}
    </span>
  )
}

ChartVoiceover.propTypes = {
  data: PropTypes.shape({}).isRequired
}

export default withStyles(style)(ChartVoiceover)