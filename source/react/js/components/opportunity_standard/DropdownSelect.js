import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from '../../styles/components/opportunity_standard/dropdown-select.scss'
import formControl from '../../styles/components/opportunity_standard/form-control.scss'

import generateUniqueId from '../../utils/misc';
import { keyValueOptionsType, keyValuePairs, valueToKey } from '../../utils/forms';
import Dropdown from './Dropdown';

// A dropdown field that allows for radio (single value) or checkbox (array of values) selection
const DropdownSelect = (props) => {
  const fieldName = props.fieldName ? props.fieldName : generateUniqueId({ name: 'form-field' });

  const options = keyValuePairs(props.options)

  const [dropdownExpandedOverride, setDropdownExpandedOverride] = useState(null);

  const handleOptionClick = (option) => {
    if (isSelected(option)) {
      if (props.multiple) {
        props.onValueChange(props.value ? props.value.filter(val => val !== option.value) : [])
      }
    } else {
      if (props.multiple) {
        props.onValueChange(props.value ? [...props.value, option.value] : [option.value])
      } else {
        props.onValueChange(option.value)
      }
    }

    if (props.autoClose) {
      setDropdownExpandedOverride(false);
      setTimeout(() => {
        setDropdownExpandedOverride(null);
      }, 0)
    }
  }

  const isSelected = (option) =>
    props.multiple ?
      props.value?.includes(option.value)
      : props.value === option.value;

  const getLabel = () => {
    if (props.multiple) {
      if (props.value?.length == 0) {
        return props.defaultLabel;
      } else if (props.value?.length == 1) {
        return valueToKey(props.value[0], options)
      } else {
        return `${valueToKey(props.value[0], options)} (+ ${props.value?.length - 1})`
      }
    } else {
      return props.value ? valueToKey(props.value, options) : props.defaultLabel;
    }
  }

  return (
    <div className={`${style.dropdownSelect} ${props.theme ? style[props.theme] : ''}`}>
      <Dropdown
        label={getLabel()}
        theme={props.theme}
        dropdownScrollOnOverflow={ props.dropdownScrollOnOverflow }
        showAsPopup={ props.showAsPopup }
        overrideExpanded={ dropdownExpandedOverride }
      >
        <div className={formControl.dropdownContainer} role="listbox" aria-multiselectable={props.multiple}>
          { options.map((option, i) =>
            <div
              className={`${style.option} ${isSelected(option) ? style.selected : ''}`}
              key={i}
              onClick={e => handleOptionClick(option)}
              role="option"
              aria-selected={isSelected(option)}
            >
              { props.multiple &&
                <input type="checkbox"
                  id={`${fieldName}_${option.value}`}
                  onChange={e => handleOptionClick(option)}
                  checked={isSelected(option)}
                />
              }

              { !props.multiple &&
                <input type="radio"
                  id={`${fieldName}_${option.value}`}
                  onChange={e => handleOptionClick(option)}
                  checked={isSelected(option)}
                />
              }

              <label htmlFor={`${fieldName}_${option.value}`} onClick={e => e.stopPropagation()}>
                { option.key }
              </label>
            </div>
          )}
        </div>
      </Dropdown>
    </div>
  )
}

DropdownSelect.propTypes = {
  options: keyValueOptionsType.isRequired,
  multiple: PropTypes.bool,
  defaultLabel: PropTypes.string,
  fieldName: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string
  ]),
  onValueChange: PropTypes.func,
  dropdownScrollOnOverflow: PropTypes.bool,
  showAsPopup: PropTypes.bool,
  autoClose: PropTypes.bool,
  theme: PropTypes.string
};

DropdownSelect.defaultProps = {
  multiple: false,
  onValueChange: (val) => {},
  defaultLabel: '',
  dropdownScrollOnOverflow: false,
  autoClose: true
}

export default withStyles(style, formControl)(DropdownSelect);