import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classnames from 'classnames';

import style from '../styles/components/checkbox.scss';
import { generateUniqueId } from '../utils/misc';
import CheckIcon from './icons/Check';
import IndeterminateIcon from './icons/Indeterminate';

const Checkbox = ({
  value,
  checked,
  name,
  label,
  disabled,
  onChange,
  indeterminate,
}) => {
  const id = generateUniqueId({ name });

  const rootStyle = classnames(
    style.root,
    { [style.checked]: checked },
    { [style.disabled]: disabled },
    { [style.indeterminate]: indeterminate },
  );

  return (
    <label
      className={rootStyle}
      htmlFor={id}
      tabIndex="0"
      onKeyDown={onChange}
    >
      <input
        tabIndex="-1"
        type="checkbox"
        name={name}
        value={value}
        id={id}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <span className={style.indicator}>
        <span className={style['icon-wrapper']}>
          {indeterminate ? (
            <IndeterminateIcon
              width={9}
              height={2}
            />
          ) : (
            <CheckIcon
              size="1.3rem"
            />
          )}
        </span>
      </span>
      {label}
    </label>
  );
};

Checkbox.propTypes = {
  value: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  indeterminate: PropTypes.bool,
};

Checkbox.defaultProps = {
  value: undefined,
  checked: false,
  disabled: false,
  name: '',
  onChange: () => {},
  label: '',
  indeterminate: false,
};

export default withStyles(style)(Checkbox);
