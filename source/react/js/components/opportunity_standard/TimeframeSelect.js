import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../../styles/components/opportunity_standard/timeframe-select.scss'
import formControl from '../../styles/components/opportunity_standard/form-control.scss'
import TabbedView from './TabbedView';
import DropdownSelect from './DropdownSelect';
import FormControl from './FormControl';
import Dropdown from './Dropdown';
import { timeframeString } from '../../utils/forms';

// A tabbed dropdown control for selecting a year/quarter range.
// Validates the selected date to be a) within the given date range and b) internally valid,
// otherwise adjusts to the nearest available year/quarter before invoking callback.
const TimeframeSelect = (props) => {
  const timeframeSelectRef = useRef(null);

  const availableStartYears = (timeframe = props.timeframe) => _.range(
    parseInt(props.allowFrom.year), parseInt(props.allowUntil.year) + 1
  ).filter(year => year <= timeframe.endYear).map(intYear => intYear.toString())

  const availableEndYears = (timeframe = props.timeframe) => _.range(
    parseInt(props.allowFrom.year), parseInt(props.allowUntil.year) + 1
  ).filter(year => year >= timeframe.startYear).map(intYear => intYear.toString())

  const availableStartQuarters = (timeframe = props.timeframe) => {
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4']
    let available = quarters

    if (timeframe.startYear == props.allowFrom.year) {
      available = quarters.slice(quarters.indexOf(props.allowFrom.quarter), quarters.length)
    }

    if (timeframe.startYear == timeframe.endYear) {
      available = available.filter(quarter => quarter <= timeframe.endQuarter)
    }

    return available
  }

  const availableEndQuarters = (timeframe = props.timeframe) => {
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4']
    let available = quarters

    if (timeframe.endYear == props.allowUntil.year) {
      available = quarters.slice(0, quarters.indexOf(props.allowUntil.quarter) + 1)
    }

    if (timeframe.startYear == timeframe.endYear) {
      available = available.filter(quarter => quarter >= timeframe.startQuarter)
    }

    return available
  }

  const validateTimeframe = (intialTimeframe, changes) => {
    // It is TimeframeSelect's responsibility to check that its timeframe is internally valid:
    // — selection quarter overflow
    //    — if timeframe is Q3 2020-Q2 2021 and user selects start year of 2021, then fix start quarter to Q2
    // — available range overflow
    //    — if timeframe is 2017-2022 and available range changes to 2019-2021, then fix timeframe to 2019-2021

    const proposedTimeframe = { ...intialTimeframe, ...changes }

    if (!availableStartYears(proposedTimeframe).includes(proposedTimeframe.startYear)) {
      proposedTimeframe.startYear = _.first(availableStartYears(proposedTimeframe))
    }
    if (!availableEndYears(proposedTimeframe).includes(proposedTimeframe.endYear)) {
      proposedTimeframe.endYear = _.last(availableEndYears(proposedTimeframe))
    }

    // Here, order of operations matters;
    // the quarter which is not in the year being changed (start/end) should have sticky preference.
    // If neither quarter is being changed (initial timeframe load), then just pick the widest range possible.
    if (changes.startYear) {
      if (!availableStartQuarters(proposedTimeframe).includes(proposedTimeframe.startQuarter)) {
        proposedTimeframe.startQuarter = _.last(availableStartQuarters(proposedTimeframe))
      }
      if (!availableEndQuarters(proposedTimeframe).includes(proposedTimeframe.endQuarter)) {
        proposedTimeframe.endQuarter = _.first(availableEndQuarters(proposedTimeframe))
      }
    } else if (changes.endYear) {
      if (!availableEndQuarters(proposedTimeframe).includes(proposedTimeframe.endQuarter)) {
        proposedTimeframe.endQuarter = _.first(availableEndQuarters(proposedTimeframe))
      }
      if (!availableStartQuarters(proposedTimeframe).includes(proposedTimeframe.startQuarter)) {
        proposedTimeframe.startQuarter = _.last(availableStartQuarters(proposedTimeframe))
      }
    } else {
      if (!availableStartQuarters(proposedTimeframe).includes(proposedTimeframe.startQuarter)) {
        proposedTimeframe.startQuarter = _.first(availableStartQuarters(proposedTimeframe))
      }
      if (!availableEndQuarters(proposedTimeframe).includes(proposedTimeframe.endQuarter)) {
        proposedTimeframe.endQuarter = _.last(availableEndQuarters(proposedTimeframe))
      }
    }

    return proposedTimeframe;
  }

  useEffect(() => {
    // Always correct timeframe on props update
    updateTimeframe(validateTimeframe(props.timeframe, {}))
  }, [])

  const updateTimeframe = (changes, userInitiated = false) => {
    props.onTimeframeChange({
      newTimeframe: validateTimeframe(props.timeframe, changes),
      userInitiated
    })
  }

  const renderSelection = (granularity = 'years') => {
    return (
      <React.Fragment>
        <FormControl label="Start" flexRatio={[3, 2]}>
          <DropdownSelect
            defaultLabel={props.translatedStrings['Year']}
            fieldName="start_year"
            options={availableStartYears()}
            value={ props.timeframe.startYear }
            onValueChange={value => updateTimeframe({ startYear: value }, true)}
            dropdownScrollOnOverflow={ props.dropdownScrollOnOverflow }
            theme="light"
          />

          { granularity == 'quarters' &&
            <DropdownSelect
              defaultLabel={props.translatedStrings['Quarter'] || 'Quarter'}
              fieldName="start_quarter"
              options={availableStartQuarters()}
              value={ props.timeframe.startQuarter }
              onValueChange={value => updateTimeframe({ startQuarter: value }, true)}
              dropdownScrollOnOverflow={ props.dropdownScrollOnOverflow }
              theme="light"
            />
          }
        </FormControl>

        <FormControl label="End" flexRatio={[3, 2]}>
          <DropdownSelect
            defaultLabel={props.translatedStrings['Year']}
            fieldName="end_year"
            options={availableEndYears()}
            value={ props.timeframe.endYear }
            onValueChange={value => updateTimeframe({ endYear: value }, true)}
            dropdownScrollOnOverflow={ props.dropdownScrollOnOverflow }
            theme="light"
          />

          { granularity == 'quarters' &&
            <DropdownSelect
              defaultLabel={props.translatedStrings['Quarter'] || 'Quarter'}
              fieldName="end_year"
              options={availableEndQuarters()}
              value={ props.timeframe.endQuarter }
              onValueChange={value => updateTimeframe({ endQuarter: value }, true)}
              dropdownScrollOnOverflow={ props.dropdownScrollOnOverflow }
              theme="light"
            />
          }
        </FormControl>
      </React.Fragment>
    )
  }

  const timescaleTabIndexMap = (key) => {
    return {
      0: 'year',
      1: 'quarter',
      'year': 0,
      'quarter': 1
    }[key]
  }

  return (
    <div ref={timeframeSelectRef}>
      <Dropdown label={timeframeString(props.timescale, props.timeframe)} theme={props.theme}>
        <div className={formControl.dropdownContainer}>
          <TabbedView
            labels={[ props.translatedStrings['Year'], props.translatedStrings['Quarter'] || 'Quarter' ]}
            activeTab={timescaleTabIndexMap(props.timescale)}
            onTabChange={tabIndex => props.onTimescaleChange(timescaleTabIndexMap(tabIndex))}
          >
            { renderSelection('years') }
            { renderSelection('quarters') }
          </TabbedView>
        </div>
      </Dropdown>
    </div>
  )
}

TimeframeSelect.propTypes = {
  timeframe: PropTypes.object.isRequired,
  onTimeframeChange: PropTypes.func,
  timescale: PropTypes.string.isRequired,
  onTimescaleChange: PropTypes.func,
  allowFrom: PropTypes.shape({
    year: PropTypes.string,
    quarter: PropTypes.string
  }).isRequired,
  allowUntil: PropTypes.shape({
    year: PropTypes.string,
    quarter: PropTypes.string
  }).isRequired,
  translatedStrings: PropTypes.object,
  dropdownScrollOnOverflow: PropTypes.bool,
  theme: PropTypes.string
};

TimeframeSelect.defaultProps = {
  onTimeframeChange: (val) => {},
  onTimescaleChange: (val) => {},
  translatedStrings: {},
  dropdownScrollOnOverflow: false
}

export default withStyles(style, formControl)(TimeframeSelect);