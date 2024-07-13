import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from '../../styles/components/opportunity_standard/radio-select.scss'
import generateUniqueId from '../../utils/misc';
import { keyValueOptionsType, keyValuePairs } from '../../utils/forms';
import Input from './Input';

// A group of radio buttons that can be rendered vertically or in-line.
// Optionally, can also render an "other" option with a text field
const RadioSelect = (props) => {
  const [value, setValue] = useState(null)
  const [otherValue, setOtherValue] = useState('')

  const fieldName = props.fieldName ? props.fieldName : generateUniqueId({ name: 'form-field'} );

  const valueToDispatch = () => {
    return value != 'Other' ? value : otherValue
  }

  // Override internal value on prop change
  useEffect(() => {
    if (valueToDispatch() !== props.value) {
      setValue(props.value)
    }
  }, [props.value])

  // Update external value on internal change
  useEffect(() => {
    if (valueToDispatch() !== null && valueToDispatch() !== props.value) {
      props.onValueChange(valueToDispatch())
    }
  }, [value, otherValue])


  const handleOptionContainerClick = (option) => {
    // Only make the whole container clickable in inline view
    if (props.inline) {
      document.getElementById(`${fieldName}_${option.value}`)?.click();
    }
  }

  return (
    <div className={`${style.radioSelect} ${props.inline ? style.inline : ''} ${props.theme ? style[props.theme] : ''}`}>
      { keyValuePairs(props.options, props.allowOther).map((option, i) =>
        <div className={`${style.option} ${option.value === value ? style.active : ''}`} key={i} onClick={e => handleOptionContainerClick(option)}>
          <input
            type="radio"
            name={fieldName}
            value={option.value}
            checked={option.value === value}
            id={`${fieldName}_${option.value}`}
            onChange={e => setValue(option.value)}
            className={props.theme ? style[props.theme] : ''}
          />

          <label htmlFor={`${fieldName}_${option.value}`}>
            {option.key}
          </label>
        </div>
      )}

      {value == 'Other' && 
        <Input
          placeholder={props.otherPlaceholder}
          name={props.otherFieldName}
          type="text"
          value={otherValue}
          onChange={e => setOtherValue(e.target.value)}
        />
      }
    </div>
  )
}

RadioSelect.propTypes = {
  options: keyValueOptionsType.isRequired,
  value: PropTypes.any,
  fieldName: PropTypes.string,
  onValueChange: PropTypes.func,
  allowOther: PropTypes.bool,
  otherPlaceholder: PropTypes.string,
  otherFieldName: PropTypes.string,
  inline: PropTypes.bool,
  theme: PropTypes.string
};

RadioSelect.defaultProps = {
  onValueChange: (val) => {},
  allowOther: false,
  otherPlaceholder: 'Enter here',
  otherFieldName: '',
  inline: false
}

export default withStyles(style)(RadioSelect);