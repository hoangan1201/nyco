import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from '../../styles/components/opportunity_standard/input.scss'

const Input = ({ value, placeholder, id, onChange, type, name, hasRadius, isRequired }) => {
  return (
    <input
      className={`${style.input} ${hasRadius ? style.hasRadius : ''}`}
      type={type}
      value={value}
      placeholder={placeholder}
      name={name}
      id={id}
      onChange={val => onChange(val)}
      required={isRequired}
    />
  )
};

Input.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  name: PropTypes.string,
  isRequired: PropTypes.bool
};

Input.defaultProps = {
  onChange: (val) => {},
  type: 'text',
  isRequired: false
}

export default withStyles(style)(Input);