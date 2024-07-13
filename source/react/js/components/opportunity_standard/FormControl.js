import React, { Children } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from '../../styles/components/opportunity_standard/form-control.scss'
import InfoTooltip from './InfoTooltip';
import generateUniqueId from '../../utils/misc';

// A wrapper for form elements, with a label, an error state, and a flex container for multi-element controls
const FormControl = (props) => {
  const { label, error, htmlFor, tooltip, labelColor } = props;

  const children = Children.toArray(props.children);

  // Default flex is 1 for each element
  const flexRatio = props.flexRatio?.length == children.length
    ? props.flexRatio
    : Array(children.length).fill(1)

  // If no htmlFor given, generate a temporary ID for the form control
  let elementId = null;
  if (!htmlFor) {
    elementId = generateUniqueId({ name: 'form-control' })
  }

  return (
    <div className={`${style.formControl} ${error ? style.error : ''}`}>
      <div className={style.labelContainer}>
        {label && 
          <label htmlFor={htmlFor ? htmlFor : elementId} className={`${labelColor ? style[labelColor] : ''}`}>
            { label }
          </label>
        }

        {tooltip &&
          <div className={style.tooltipContainer} role="tooltip">
            <InfoTooltip helpText={tooltip} />
          </div>
        }
      </div>

      {error &&
        <span className={style.errorLabel} data-is-alert tabIndex={0}>
          { error }
        </span>
      }

      <div className={`${style.controls}`} id={elementId}>
        { children.map((child, i) =>
          <div className={style.control} key={i} style={{ flex: flexRatio[i] }}>
            { child }
          </div>
        ) }
      </div>
    </div>
  )
}

FormControl.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  htmlFor: PropTypes.string,
  tooltip: PropTypes.string,
  labelColor: PropTypes.string,
  flexRatio: PropTypes.arrayOf(PropTypes.number)
};

export default withStyles(style)(FormControl);