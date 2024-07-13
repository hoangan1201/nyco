import _ from 'lodash';
import newYork from '../data/ny';

export default class MapsShapeData {
  static config({ mapData, shapefileCoordinates, useDefaultMap, categories = ['name', 'value'] }) {
    const { features } = mapData;
    const points = [];
    _.map(features, (feature) => {
      if (feature.geometry.type === 'Point') {
        points.push({
          lon: feature.geometry.coordinates[0],
          lat: feature.geometry.coordinates[1],
          title: feature.properties.title,
          tooltip_content: feature.properties.tooltip_content,
        });
      } else if (feature.geometry.type === 'Polygon' && feature.properties.fill) {
        shapefileCoordinates.push({
          'hc-key': feature.properties['hc-key'],
          title: feature.properties.title,
          tooltip_content: feature.properties.value,
          color: feature.properties.fill,
        });
      }
    });
    let series = [{
      // states: {
      //   hover: {
      //     borderWidth: 10,
      //   },
      // },
      mapData,
      data: shapefileCoordinates,
      tooltip: { enabled: false },
      dataLabels: { enabled: true },
    },
    {
      type: 'mappoint',
      name: 'Cities',
      data: points,
    }];
    if (useDefaultMap) {
      series = [{
        mapData: newYork,
      }].concat(series);
    }
    return ({
      chart: {
        // backgroundColor: '#0A254E',
        // backgroundColor: '#071F42',
        backgroundColor: 'transparent',
      },
      title: {
        text: '',
      },
      colors: [
        '#006333',
        '#008E46',
        '#4BAC4C',
        '#7DC963',
        '#A8DD7C',
        '#C6F0A3',
        '#FCF1CD',
        '#FDE9A6',
        '#F6D772',
        '#FAD457',
        '#FFD029',
        '#FFC400',
      ],
      // mapNavigation: {
      //   enabled: true,
      // },
      plotOptions: {
        map: {
          allAreas: true,
          // joinBy: ['iso-a2', 'code'],
          dataLabels: {
            enabled: true,
            color: 'black',
            // style: {
            //   fontWeight: 'bold',
            // },
          },
          // mapData,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#C9EEFE',
        borderWidth: 0,
        style: {
          color: '#031837',
          fontWeight: 'bold',
          fontFamily: 'Montserrat',
        },
        useHTML: true,
        headerFormat: '<div style="border-top: 6px solid #90C1D6"></div><div style="padding: 10px">',
        pointFormat: `${categories[0]}: {point.title}<br/>${categories[1]}: {point.tooltip_content}`,
        footerFormat: '</div>',
        padding: 0,
      },
      series,
      legend: { enabled: false },
      exporting: {
        enabled: false,
        sourceWidth: 1200,
        sourceHeight: 800,
      },
      credits: false,
    });
  }
}
