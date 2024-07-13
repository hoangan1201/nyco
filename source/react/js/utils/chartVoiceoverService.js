import { replaceVoiceoverCharacters } from '../utils/accessibility';

// This class turns a Highcharts data object into screen-reader-friendly HTML content.
// Basic usage: const service = ChartVoiceoverService(...); service.buildFromChartData(); return service.htmlString

class ChartVoiceoverService {
  constructor(chartData, forcePercentage = false, includeChartDescription = false) {
    this.body = [];
    this.data = chartData;
    this.forcePercentage = forcePercentage;
    this.includeChartDescription = includeChartDescription;
    this.chartType = this.data.chart.type;
    this.title = this.data.title.wdpTitle ? this.data.title.wdpTitle : (this.data.title.text ? this.data.title.text : 'Unnamed chart');
  }

  addToBody(sentence, level = 'p', forceNewParagraph = false) {
    // Adds a sentence to the built HTML content.
    // If this is a <p> and the last element was also a <p>, append text to previous <p> for better screen reader flow.
    if (level == 'p' && this.body[this.body.length - 1]?.level == 'p' && !forceNewParagraph) {
      this.body[this.body.length - 1].text += ` ${sentence}`;
    } else {
      this.body.push({
        text: sentence,
        level
      });
    }
  }

  axisLabel(axis = 'x', force = false) {
    return this.data[`${axis}Axis`].title.text ? this.data[`${axis}Axis`].title.text : (force ? `${axis.toUpperCase()} axis` : null)
  }

  get nodeList() {
    return this.body.map(line => {
      let node = document.createElement(line.level);
      node.innerHTML = line.text;
      return node
    })
  }

  get elementObjectList() {
    return this.body;
  }

  get htmlString() {
    let res = ``;
    this.body.forEach(line => {
      res += `<${line.level}>${line.text}</${line.level}>`
    })
    return res
  }

  get isPercentage() {
    return this.forcePercentage || (this.title.match(/\b(rates|rate|percent)\b/gi) || this.axisLabel('y', true).match(/\b(rates|rate|percent)\b/gi)); // Regex for phrases indicating percentage as a separate word
  }

  get categories() {
    return this.data?.xAxis?.categories;
  }

  getStringRangeFromList(list) {
    if (!list || list.length == 0) return null;

    // E.g. transform from ['2020-Q1', '2020-Q2'] => [2020, 2020]
    let numericItems = list.map(it => it.split('-')).map(it => parseInt(it[0]))
    
    // Check if list is ordered incrementally
    if (numericItems.every((val, i) => (i == 0) || (val >= numericItems[i - 1]))) {
      return { first: numericItems[0], last: numericItems[numericItems.length - 1 ]}
    }

    return null;
  }

  buildFromChartData() {
    this.addToBody(this.title, 'h4')

    // Do not yet have a good way to do voiceover of maps (large GeoJSON files)
    if (!this.data.chart.type || this.data.chart.type == 'map' || this.data.plotOptions.map) {
      if (this.includeChartDescription) {
        this.addToBody(this.data.chartDescription.replace(/(<([^>]+)>)/ig, ''));
      }
      return
    }

    this.buildHeaderSection();
    this.buildContentSection();
  }

  buildHeaderSection() {
    this.addToBody('Data summary', 'h5')

    // 1. Announce chart type
    this.addToBody(`This is a ${this.chartType} chart.`);

    // 2. Announce chart description with stripped HTML tags
    if (this.includeChartDescription) {
      this.addToBody(this.data.chartDescription.replace(/(<([^>]+)>)/ig, ''));
    }

    // 3. Announce X axis
    if (this.categories.length > 0) {
      const xAxisRange = this.getStringRangeFromList(this.categories);
      if (xAxisRange) {
        const { first, last } = xAxisRange;
        this.addToBody(`
          The X axis ${this.data.xAxis.title.text ? `shows ${this.data.xAxis.title.text} and` : ''} covers a range from ${first} to ${last}.
        `)
      } else {
        this.addToBody(`
          The X axis ${this.data.xAxis.title.text ? `shows ${this.data.xAxis.title.text} and` : ''} covers ${this.categories.length} categories: ${this.categories.join(', ')}.
        `)
      }
    } else if (this.axisLabel('x')) {
      this.addToBody(`The X axis shows ${this.axisLabel('x')}.`)
    }
  

    // 4. Announce Y axis
    if (this.data.yAxis.title.text) {
      this.addToBody(`The Y axis shows ${this.data.yAxis.title.text}.`);
    }
  }

  buildContentSection() {
    this.addToBody('Data content', 'h5')

    if (this.chartType == 'scatter') {
      // Scatter is specific because it isn't an aggregate chart; we go by series and announce point-by-point
      this.data.series.forEach((series, seriesIndex) => {
        this.addToBody(`Series ${seriesIndex + 1} of ${this.data.series.length}: ${replaceVoiceoverCharacters(series.name)}.`, 'h6');
        
        series.data.forEach((point, pointIndex) => {
          this.addToBody(`Point ${pointIndex + 1} of ${series.data.length}: ${this.axisLabel('x', true)} is ${point[0]}, ${this.axisLabel('y', true)} is ${point[1]}.`);
        });
      });

      return;
    }

    if (this.chartType == 'boxplot') {
      // A non-boxplot series is just its associated outliers
      const boxplotSeries = this.data.series.filter(series => series.type === 'boxplot');
      const outlierSeries = this.data.series.filter(series => series.type === 'scatter');

      const hasMultipleSeries = boxplotSeries.length > 1;

      boxplotSeries.forEach((series, seriesIndex) => {
        if (hasMultipleSeries) {
          this.addToBody(`Series ${seriesIndex + 1} of ${boxplotSeries.length}: ${replaceVoiceoverCharacters(series.name)}.`, 'h6');
        }

        const associatedOutlierSeries = outlierSeries.find(outliers => outliers.linkedTo === `series_${seriesIndex}`);
        
        series.data.forEach((boxplot, boxplotIndex) => {
          const xValue = this.categories[boxplotIndex] || boxplotIndex;
          const associatedOutliers = associatedOutlierSeries?.data.filter(point => point[0] == boxplotIndex);

          this.addToBody(`${boxplotIndex + 1} of ${series.data.length}: ${this.axisLabel('x', true)} is ${xValue}.`, 'p', true);
          this.addToBody(`Minimum is ${boxplot[0]}, first quartile is ${boxplot[1]}, median is ${boxplot[2]}, third quartile is ${boxplot[3]}, maximum is ${boxplot[4]}.`);

          if (associatedOutliers?.length > 0) {
            const outlierYValues = associatedOutliers.map(outlier => outlier[1]);

            this.addToBody(`This boxplot has ${associatedOutliers.length} outliers: ${ outlierYValues.join(', ')}.`);
          }
        });
      });

      return;
    }

    // Map series to categories (here, category = axis label)
    let categoryMappings = []

    this.categories.forEach((category, categoryIndex) => {
      categoryMappings[categoryIndex] = {name: replaceVoiceoverCharacters(category), series: []}

      this.data.series.forEach((series, seriesIndex) => {
        categoryMappings[categoryIndex].series.push({
          name: replaceVoiceoverCharacters(series.name), data: series.data[categoryIndex]
        })
      })
    })

    // What kind of record are we announcing? e.g. clients served, wage loss
    let recordLabel = 
      this.title.includes(' by ') ? this.title.split(' by ')[0] : 'records';

    // Announce data for each X axis stop-point ( = category)
    categoryMappings.forEach((category, i) => {
      let total = category.series.reduce((sum, item) => sum + parseInt(item.data), 0)
      
      if (this.isPercentage) {
        // Don't announce total (e.g. rates may or may not add up to 100%, but this is not helpful info)
        this.addToBody(`${i + 1} of ${categoryMappings.length}: ${category.name}.`, 'h6')

        // Announce rates
        // By context, this could mean "30% were under 24", but also "30% of those under 24";
        // so, let's just say "under 24: 30%".
        category.series.forEach(series => {
          this.addToBody(`${series.name}: ${series.data} percent.`)
        })
      } else {
        this.addToBody(`${i + 1} of ${categoryMappings.length}: ${category.name}.`, 'h6')
        
        if (category.series.length == 1) {
          // If there's only one legend category, then it actually refers to the count
          // (e.g. "Count of client losing wage" is the only category shown under "Wage loss")
          this.addToBody(`${category.series[0].name}: ${total}`);
        } else {
          // Announce total (e.g. there was a total of 1300 clients served)
          this.addToBody(`Total of ${total} ${recordLabel}. Breakdown:`)

          // Follow with simple numerical breakdown by multiple categories (e.g. 300 were female)
          category.series.forEach(series => {
            this.addToBody(`${series.data} were ${series.name}.`)
          })
        }
      }
    })
  }
}

export default ChartVoiceoverService;