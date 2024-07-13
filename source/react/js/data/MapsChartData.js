export default class MapsChartData {
  static config({ mapData, locations, clickHandler }) {
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
            color: 'white',
            // style: {
            //   fontWeight: 'bold',
            // },
          },
          mapData,
        },
        series: {
          point: {
            events: {
              click: clickHandler,
            },
          },
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
        headerFormat: '<div style="display:none">',
        footerFormat: '</div>',
        padding: 0,
      },
      series: [{
        // states: {
        //   hover: {
        //     borderWidth: 10,
        //   },
        // },
        name: 'borough-selector',
        data: [
          {
            'hc-key': 'us-ny-081',
            value: 'Queens',
            color: '#008D49',
            borderColor: '#008D49',
          }, {
            'hc-key': 'us-ny-005',
            value: 'Bronx',
            color: '#A8DD7C',
            borderColor: '#A8DD7C',
          }, {
            'hc-key': 'us-ny-061',
            value: 'Manhattan',
            color: '#4BAC4C',
            borderColor: '#4BAC4C',
          }, {
            'hc-key': 'us-ny-047',
            value: 'Brooklyn',
            color: '#A8DD7C',
            borderColor: '#A8DD7C',
          }, {
            'hc-key': 'us-ny-085',
            value: 'Staten Island',
            color: '#4BAC4C',
            borderColor: '#4BAC4C',
          },
        ],
        tooltip: { enabled: false },
        dataLabels: { enabled: false },
      }, {
        type: 'mappoint',
        name: 'Programs',
        data: locations,
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
          pointFormat: '{point.title}',
          footerFormat: '</div>',
          // shared: true,
          padding: 0,
        },
        dataLabels: { enabled: true },
        marker: {
          radius: 6,
          fillColor: '#FFCF3F',
          lineColor: '#D3A315',
          lineWidth: 1,
          states: {
            hover: {
              fillColor: '#C9EEFE',
              lineColor: '#90C1D6',
              lineWidthPlus: 3,
            },
          },
        },
      }],
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
