import React, { useEffect, useMemo, useRef, useState } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import style from '../styles/components/common-metric-view.scss';
import layout from '../styles/with-layout.scss';
import FormControl from './opportunity_standard/FormControl';
import RadioSelect from './opportunity_standard/RadioSelect';
import DropdownSelect from './opportunity_standard/DropdownSelect';
import TimeframeSelect from './opportunity_standard/TimeframeSelect';
import CommonMetricCard from './CommonMetricCard';
import ArrowUpIcon from './opportunity_standard/icons/ArrowUp';
import FilterIcon from './opportunity_standard/icons/Filter';
import PersonIcon from './opportunity_standard/icons/Person';
import Chart from './Chart';
import { explodeQuarterString, handleDownload, scrollIntoViewWithOffset } from '../utils/misc';
import ChartProcessingService from '../utils/chartProcessingService';
import SkeletonWrapper from './SkeletonWrapper';
import SkeletonItem from '../components/SkeletonItem';
import Pill from './opportunity_standard/Pill';
import BigNumberCard from './opportunity_standard/BigNumberCard';
import { timeframeString } from '../utils/forms';
import { getMarqueeNumber } from '../actions/commonMetrics';
import Button from './opportunity_standard/Button';
import GenericModal from './GenericModal';
import { exportChart } from '../actions/highcharts';

const getTimeframeCutoff = (startOrEnd = 'start', metric) => {
  // Returns the first/last quarter available for a given metric as { year, quarter } 
  let quarterString = null;

  if (startOrEnd == 'start') {
    quarterString = _.first(metric.quarter_year_range)
  } else {
    quarterString = _.last(metric.quarter_year_range)
  }

  return explodeQuarterString(quarterString)
}

const incompleteDataDisclaimer = (metric) => {
  // Returns a disclaimer string stating which years in a metric have incomplete data, and up to which quarter (otherwise null).
  let disclaimers = [];

  metric.year_range.forEach(year => {
    let quartersForYear = metric.quarter_year_range.filter(q => q.includes(year))
    if (quartersForYear.length != 4) {
      const lastQuarter = explodeQuarterString(_.last(quartersForYear)).quarter;
      disclaimers.push(`${ year } data only available through ${ lastQuarter }`);
    }
  })

  return disclaimers.length > 0 ? disclaimers.join('. ') : null;
}

const defaultTimeframe = (metric) => ({
  startYear: getTimeframeCutoff('start', metric).year,
  endYear: getTimeframeCutoff('end', metric).year,
  startQuarter: getTimeframeCutoff('start', metric).quarter,
  endQuarter: getTimeframeCutoff('end', metric).quarter,
  lastUpdateWasUserInitiated: false
})

const CommonMetricView = (props) => {
  const { metric, populationOptions, translatedStrings, intl, metricSelectionRef, marqueeRequest } = props;

  const isLoading = !metric || !metric.id;

  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    view: 'chart', // or 'table',
    distributionView: false,
    populations: [],
    timescale: 'year',
    timeframe: {
      startYear: null,
      endYear: null,
      startQuarter: null,
      endQuarter: null,
      lastUpdateWasUserInitiated: false, // Whether last update was the result of internal logic (e.g. updating timeframe end year to match metric data availability) or user choice
      userInteractedWithTimeframe: false  // Whether user has, at any point, changed the timeframe. If so, we will keep the filters sticky across metrics; otherwise, we'll always update to show all data
    }
  })

  // A copy of filter controls for the mobile/tablet modal, which should only update the real filters when "apply changes" is pressed
  const [modalFilters, setModalFilters] = useState(_.cloneDeep(filters));
  const [modalFiltersOpen, setModalFiltersOpen] = useState(false);
  useEffect(() => {
    setModalFilters(_.cloneDeep(filters));
  }, [JSON.stringify(filters)])

  useEffect(() => {
    if (metric && metric.id) {
      // Only set timeframe to max available span on first metric load, or if user hasn't yet interacted with the timeframe filter;
      // otherwise, remain sticky (and handle any inconsistencies inside TimeframeSelect)
      if (!filters.timeframe.startYear || !filters.timeframe.userInteractedWithTimeframe) {
        const timeframe = defaultTimeframe(metric)

        setFilters({ ...filters, timeframe })
      }
    }
  }, [metric])

  // Maintain the refs of currently displayed charts/tables, indexed in order, for download
  const chartsAndTablesRef = useRef([]);
  useEffect(() => {
    chartsAndTablesRef.current = chartsAndTablesRef.current.slice(0, metric?.visualization.length);
  }, [metric?.visualization]);

  const renderCardContent = (visualization, i) => {
    const processingService = new ChartProcessingService({ chart: visualization, filters, populationOptions });
    const columnChart = processingService.buildCommonMetricChart();

    if (filters.view == 'chart') {
      return (
        <Chart
          data={columnChart}
          distributionView={ filters.distributionView }
          onMount={ chartRef => chartsAndTablesRef.current[i] = chartRef }
        />
      )
    } else if (filters.view == 'table') {
      return (
        <div dangerouslySetInnerHTML={{ __html: columnChart.getTable() }} ref={el => chartsAndTablesRef.current[i] = el} />
      )
    }
  }

  const cardContentMap = useMemo(() => {
    return metric?.visualization?.map((visualization, i) => renderCardContent(visualization, i));
  }, [metric?.id, JSON.stringify(filters)])

  const onDownloadClick = (visualization, mimetype, i) => {
    if (filters.view === 'chart') {
      const chartRef = chartsAndTablesRef.current[i]
      
      dispatch(exportChart({
        mimetype,
        chartRef,
        filename: visualization.title
      }))
    } else if (filters.view === 'table') {
      handleDownload({ csv: chartsAndTablesRef.current[i], filename: visualization.title })
    }
  }

  const updateMarquee = (marqueeTimeframe) => {
    const chartService = new ChartProcessingService({ filters: { ...filters, timeframe: marqueeTimeframe } });
    const periods = chartService.getPeriodsFromTimeframe();

    dispatch(
      getMarqueeNumber({
        metric: metric.metric_id,
        years: filters.timescale === 'year' ? periods : null,
        quarterYears: filters.timescale === 'quarter' ? periods : null,
        programs: filters.populations
      })
    );
  }

  // Update marquee whenever timeframe changes by user input
  useEffect(() => {
    if (!metric || filters.timeframe.startYear === null) return; // On first load, timeframe may not be initialized yet

    if (filters.timeframe.lastUpdateWasUserInitiated) {
      updateMarquee(filters.timeframe)
    }
  }, [JSON.stringify(filters.timeframe)])

  // Update marquee whenever populations change
  useEffect(() => {
    if (!metric) return;
    updateMarquee(filters.timeframe)
  }, [filters.populations])

  // Update marquee whenever metric selection changes
  useEffect(() => {
    // On first load, metric is null, and then filters are only updated to default on next tick; handle this edge case
    if (!metric) return;
    const marqueeTimeframe = filters.timeframe.startYear === null ? defaultTimeframe(metric) : filters.timeframe;
    
    updateMarquee(marqueeTimeframe);
  }, [ metric?.metric_id, filters.timescale ]);

  const onTimeframeChange = ({ newTimeframe, userInitiated }, filterCallback = setFilters, workingFilters = filters) => {
    filterCallback({
      ...workingFilters,
      timeframe: {
        ...newTimeframe,
        lastUpdateWasUserInitiated: userInitiated,
        userInteractedWithTimeframe: userInitiated ? true : (workingFilters.timeframe.userInteractedWithTimeframe)
      }
    });
  }

  const scrollToMetrics = () => scrollIntoViewWithOffset(metricSelectionRef.current, -60);

  const translate = (translationString, fallback = null) =>
    translatedStrings[translationString]
    || metric?.translations?.[intl.locale][translationString]
    || fallback
    || translationString;

  const currentPopulationsLabel = useMemo(() => {
    if (filters.populations.length === 0 || filters.populations.length === populationOptions?.length) {
      return null;
    }

    return filters.populations.map(
      populationValue => populationOptions.find(item => item.value === populationValue).key
    ).join(', ');
  }, [filters.populations, populationOptions])

  const renderMarqueeSection = () =>
    <div className={`${layout.section} ${layout.darker} ${layout.noTopPadding}`} id="marquee-section">
      { isLoading && 
        <SkeletonWrapper>
          <div className={layout.content} style={{ flex: 1, marginRight: '5rem' }}>
            <p><SkeletonItem height="19rem" style={{ borderRadius: '5px' }} /></p>
          </div>

          <div className={layout.content} style={{ flex: 2 }}>
            <p><SkeletonItem count={4} height="1rem" /></p>
          </div>
        </SkeletonWrapper>
      }

      { !isLoading &&
        <>
          <div className={layout.content} style={{ flex: 1, marginRight: '5rem' }}>
            <BigNumberCard
              label={ timeframeString(filters.timescale, filters.timeframe) }
              heading={ metric.title }
              icon={ <PersonIcon size={36} /> }
              isLoading={!!marqueeRequest || metric?.marqueeNumber === null}
              number={metric?.marqueeNumber?.toLocaleString()}
              bottomLabel={ currentPopulationsLabel }
            />
          </div>

          <div className={layout.content} style={{ flex: 2 }}>
            <p dangerouslySetInnerHTML={{ __html: metric.description }} />
          </div>
        </>
      }
    </div>

  // Keep track of whether sidebar is in its sticky position, in order to handle the overflow of dropdowns inside
  const filterContainerRef = useRef(null);
  const [filterIsFullyVisible, setFilterIsFullyVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      setFilterIsFullyVisible(entries[0].isIntersecting);
    }, { threshold: [1] });

    observer.observe(filterContainerRef.current);

    return () => {
      observer.unobserve(filterContainerRef.current)
    }
  }, [filterContainerRef])

  const renderFilters = (isInModal = false) => {
    // Within the modal window, we want to save any changes to a temporary copy of the real filters,
    // and only push them to the real filters when "apply changes" is pressed.
    // Otherwise, directly update the filters state, which is linked to the charts.
    const filterCallback = isInModal ? setModalFilters : setFilters;
    const workingFilters = isInModal ? modalFilters : filters;

    return (
      <>
        {!isInModal && 
          <>
            { !isLoading &&
              <Pill
                label={metric.title}
                isActive={false}
                onClick={metricSelectionRef ? scrollToMetrics : null}
                icon={<ArrowUpIcon size={15} />}
                theme="dark"
              />
            }

            <h4 className={layout.sparse}>{ translate('Filter Data By') }</h4>
          </>
        }
        
        <FormControl label={translate('Time Span')} labelColor="lightBlue">
          { isLoading && <SkeletonItem /> }
          { !isLoading && 
            <TimeframeSelect
              timeframe={ workingFilters.timeframe }
              timescale={ workingFilters.timescale }
              allowFrom={ getTimeframeCutoff('start', metric) }
              allowUntil={ getTimeframeCutoff('end', metric) }
              onTimeframeChange={ event => onTimeframeChange(event, filterCallback, workingFilters) }
              onTimescaleChange={ value => filterCallback({...workingFilters, timescale: value}) }
              dropdownScrollOnOverflow={ filterIsFullyVisible }
              translatedStrings={ translatedStrings }
              theme="dark"
            />
          }
        </FormControl>

        <FormControl label={translate('Target Population')} labelColor="lightBlue">
          { isLoading && <SkeletonItem /> }
          { !isLoading && 
            <DropdownSelect
              defaultLabel={translate('Select a population')}
              multiple={true}
              options={ populationOptions }
              value={ workingFilters.populations }
              autoClose={ false }
              onValueChange={value => filterCallback({...workingFilters, populations: value})}
              theme="dark"
            />
          }
        </FormControl>

        <FormControl label={translate('View as')} labelColor="lightBlue">
          { isLoading && <SkeletonItem /> }
          { !isLoading && 
            <RadioSelect
              options={[{ key: translate('Chart'), value: 'chart' }, { key: translate('Table'), value: 'table' }]}
              value={ workingFilters.view }
              inline={true}
              onValueChange={value => filterCallback({...workingFilters, view: value})}
              theme="dark"
            />
          }
        </FormControl>

        <FormControl label={translate('Distribution View')} labelColor="lightBlue" tooltip={translate('distribution_view_tooltip', 'Distribution view compares the percentage each category contributes to the whole.')}>
          { isLoading && <SkeletonItem /> }
          { !isLoading && 
            <RadioSelect
              options={[ { key: translate('Off'), value: false }, { key: translate('On'), value: true } ]}
              value={ workingFilters.distributionView }
              inline={true}
              onValueChange={value => filterCallback({...workingFilters, distributionView: value})}
              theme="dark"
            />
          }
        </FormControl>
      </>
    )
  }

  return (
    <>
      { renderMarqueeSection() }

      <div className={`${style.splitSection} ${layout.hasBottomMargin}`}>
        <SkeletonWrapper height="4rem">
          <div className={`${style.filterContainer} ${layout.desktopOnly}`} ref={filterContainerRef}>
            { renderFilters() }
          </div>

          <div className={`${style.filterContainer} ${layout.tabletOnly}`}>
            <Button
              label={ translate('Filter Metric Data') }
              iconLeft={ <FilterIcon size={16} /> }
              theme={['dark', 'whiteContent']}
              onClick={() => setModalFiltersOpen(true)}
            />

            <GenericModal
              isOpen={modalFiltersOpen}
              onRequestClose={() => { setModalFiltersOpen(false); setModalFilters(_.cloneDeep(filters)) }} // Undo filter changes
              headerLabel={ translate('Filter Metric Data') }
              content={ renderFilters(true) }
              footer={
                <Button
                  isBlock={true}
                  onClick={() => { setModalFiltersOpen(false); setFilters(_.cloneDeep(modalFilters)) }} // Update real filter with changes
                  label={ translate('Apply Changes') }
                  theme="dark"
                />
              }
            />
          </div>

          <div className={style.graphsContainer}>
            { isLoading && 
              <CommonMetricCard
                title=""
                description=""
                cardContent={ <SkeletonItem height="60vh" /> }
                contentType="loader"
              />
            }

            { !isLoading && metric.visualization.map((visualization, i) =>
              <CommonMetricCard
                title={ visualization.title }
                description={ visualization.description }
                disclaimer={ incompleteDataDisclaimer(metric) }
                notes={ visualization.data_notes }
                cardContent={ cardContentMap[i] }
                contentType={ filters.view }
                downloadCallback={ mimetype => onDownloadClick(visualization, mimetype, i) }
                key={i}
              />
            ) }
          </div>
        </SkeletonWrapper>
      </div>
    </>
  )
}

CommonMetricView.propTypes = {
  metric: PropTypes.object,
  populationOptions: PropTypes.array,
  translatedStrings: PropTypes.object.isRequired,
  intl: PropTypes.shape({
    locale: PropTypes.string,
    isRtl: PropTypes.bool
  }).isRequired,
  metricSelectionRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  })
}

const mapStateToProps = ({ commonMetrics }) => {
  const { marqueeRequest } = commonMetrics;
  return {
    marqueeRequest
  };
};

export default compose(
  withStyles(style, layout),
  connect(mapStateToProps)
)(CommonMetricView);