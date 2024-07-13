import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from '../../styles/components/opportunity_standard/chip-select.scss'
import { keyValueOptionsType, keyValuePairs } from '../../utils/forms';
import Button from './Button';

// A group of chips, where one (or multiple with prop) can be selected.
const ChipSelect = (props) => {
  const options = keyValuePairs(props.options);
  const { value, multiple, maxViewAtOnce, onValueChange, itemPlural, theme } = props;

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // If selected option is hidden, default to expanded view
    if (value && options.map(option => option.value).includes(value) && !visibleOptions().map(option => option.value).includes(value)) {
      setExpanded(true);
    }
  }, [options, value])

  const visibleOptions = () => {
    if (!expanded && maxViewAtOnce) {
      return options.slice(0, maxViewAtOnce)
    } else {
      return options;
    }
  }

  const isSelected = (option) => {
    if (value === null) return false;

    if (multiple) {
      return value.includes(option.value)
    } else {
      return value === option.value
    }
  }

  const handleOptionClick = (option) => {
    const oldValue = value;

    if (isSelected(option)) {
      if (multiple) {
        onValueChange(oldValue ? oldValue.filter(val => val !== option.value) : [])
      }
    } else {
      if (multiple) {
        onValueChange(oldValue ? [...oldValue, option.value] : [option.value])
      } else {
        if (oldValue !== option.value) {
          onValueChange(option.value)
        }
      }
    }
  }

  const numberOfHiddenItems = !expanded && maxViewAtOnce < options.length ? (options.length - maxViewAtOnce) : 0;

  return (
    <div className={`${style.chipSelect} ${theme ? style[theme] : ''}`} aria-expanded={numberOfHiddenItems == 0} role="menu" aria-label="In-page navigation">
      { visibleOptions().map((option, i) =>
        <div
          className={`${style.chip} ${isSelected(option) ? style.selected : ''}`}
          aria-selected={isSelected(option)}
          onClick={e => handleOptionClick(option)}
          key={i}
          role="menuitem"
          tabIndex={0}
        >
          { option.key }
        </div>
      )}

      { numberOfHiddenItems > 0 &&
        <Button
          label={`See ${numberOfHiddenItems} More${itemPlural ? ` ${itemPlural}` : ''}`}
          onClick={(e) => setExpanded(true)}
          theme={theme}
          isBlock={true}
        />
      }
    </div>
  )
}

ChipSelect.propTypes = {
  options: keyValueOptionsType.isRequired,
  value: PropTypes.any,
  multiple: PropTypes.bool,
  maxViewAtOnce: PropTypes.number,
  onValueChange: PropTypes.func,
  itemPlural: PropTypes.string,
  theme: PropTypes.string
}

ChipSelect.defaultProps = {
  multiple: false,
  value: null,
  onValueChange: () => {}
}

export default withStyles(style)(ChipSelect);