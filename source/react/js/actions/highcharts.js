import axios from 'axios';
import { downloadExportedFile, getCookie } from '../utils/misc';

import {
  MAP_ADDED,
  SANKEY_ADDED,
  CHART_EXPORT_API_REQUEST,
  CHART_EXPORT_API_SUCCESS,
  CHART_EXPORT_API_FAILURE
} from './actionTypes';

// By default, will use the free Highcharts export server;
// If true, will use the custom NYCO server, currently awaiting AWS deployment (uses a slightly different request format)
const USE_CUSTOM_EXPORT_SERVER = false;

export const mapAdded = () => ({
  type: MAP_ADDED,
});

export const sankeyAdded = () => ({
  type: SANKEY_ADDED,
});

export const exportApiRequest = () => ({
  type: CHART_EXPORT_API_REQUEST,
});

export const exportApiSuccess = () => ({
  type: CHART_EXPORT_API_SUCCESS
});

export const exportApiFailure = ({ errors }) => ({
  type: CHART_EXPORT_API_FAILURE,
  payload: errors
});

export const exportChart = ({ mimetype, filename, chartRef }) => (dispatch) => {
  dispatch(exportApiRequest());

  // Some maps were saved with transparent backgrounds, but that's not how we display them on the frontend
  if (chartRef.chart.backgroundColor == 'transparent') {
    chartRef.chart.backgroundColor = '#0A254E';
  }

  if (USE_CUSTOM_EXPORT_SERVER) {
    const url = '/en/api/v1/chart-export/';
    const data = {
      chartRef: chartRef.chart.options,
      mimetype
    };

    axios({
      url,
      method: 'POST',
      data,
      headers: {
        'content-type': 'application/json; charset=UTF-8',
        'X-CSRFToken': getCookie('csrftoken')
      },
    }).then(({ data }) => {
      downloadExportedFile(mimetype, filename, data)
      dispatch(exportApiSuccess());
    }).catch(errors => {
      console.log(errors)
      dispatch(exportApiFailure({ errors }));
    });
  } else {
    chartRef.chart.exportChart({
      type: mimetype,
      filename: filename
    });

    setTimeout(() => {
      dispatch(exportApiSuccess());
    }, 500) // The library export function isn't async
  }
};