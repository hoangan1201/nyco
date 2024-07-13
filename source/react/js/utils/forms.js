import { useEffect } from "react"
import PropTypes from 'prop-types';

export const keyValuePairs = (values, pushOther = false) => {
  if (values.length > 0 && typeof values[0] === 'string') {
    // Transforms an array of string values into an array of key-value objects
    if (pushOther && !values.includes('Other')) {
      values.push('Other')
    }
    
    return values.map(value => {
      return {
        key: value,
        value: value
      }
    })
  } else {
    // Assuming `values` is already a list of key-value pairs due to proptypes check
    if (pushOther && !values.find(val => val.key == 'Other')) {
      values.push({ key: 'Other', value: 'Other' })
    }

    return values;
  }
}

export const valueToKey = (value, options) => options.find(option => option.value === value)?.key;

export const outsideClickListener = (ref, callback) => {
  useEffect(() => {
    const onClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    }
  }, [ref]);
}

export const keyValueOptionsType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.string), // [value<string>] = [keys<string>]
  PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.any
  })) // [{ key, value }]
])

export const timeframeString = (timescale, timeframe) => {
  if (timescale == 'year') {
    return `${timeframe.startYear} — ${timeframe.endYear}`
  } else {
    return `${timeframe.startQuarter} ${timeframe.startYear} — ${timeframe.endQuarter} ${timeframe.endYear}`
  }
}