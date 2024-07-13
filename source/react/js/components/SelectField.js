import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/select-field.scss';
import generateUniqueId from '../utils/misc';

// import '../styles/select-field.scss';

class SelectField extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        // value: PropTypes.string.isRequired,
        // value: PropTypes.number.isRequired,
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]).isRequired,
        label: PropTypes.string,
        disabled: PropTypes.bool,
      }),
    ).isRequired,
    name: PropTypes.string,
    // value: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    errorText: PropTypes.string,
    floatingLabelText: PropTypes.string,
    disabled: PropTypes.bool,
    multiple: PropTypes.bool,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    isAlt: PropTypes.bool,
  }

  static defaultProps = {
    name: '',
    value: null,
    errorText: '',
    floatingLabelText: null,
    disabled: false,
    multiple: false,
    required: false,
    onChange: () => {},
    isAlt: false,
  }

  constructor(props) {
    super(props);

    this.state = {
      value: props.value || '',
      focused: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;
    if (value !== nextProps.value) {
      this.setState({
        ...this.state,
        value: nextProps.value,
      });
    }
  }

  handleInputFocus = () => {
    this.setState({
      ...this.state,
      focused: true,
    });
  }

  handleInputBlur = () => {
    this.setState({
      ...this.state,
      focused: false,
    });
  }

  handleInputChange = (event) => {
    const { onChange } = this.props;

    const { value } = event.target;
    this.setState({
      ...this.state,
      value: !Number.isNaN(value) ? value : parseInt(value, 10),
    });

    onChange(event);
  }

  renderOptions() {
    const { options } = this.props;
    
    return options.map(({ value, label, disabled }) => {
      if(disabled){
        return (
          <option key={value} value={value} disabled>
            {label || value}
          </option>
        );
      }
      
      return (
        <option key={value} value={value}>
          {label || value}
        </option>
      );
    });
  }

  render() {
    const {
      name,
      required,
      multiple,
      disabled,
      errorText,
      floatingLabelText,
      isAlt,
    } = this.props;
    const {
      value,
      focused,
    } = this.state;

    // const dropdownWrapperClassName = classnames({
    //   'dropdown-wrapper': true,
    //   focus: focused,
    //   'has-error': errorText,
    // });

    const dropdownWrapperClassName = classnames(
      style['dropdown-wrapper'],
      { [style.focused]: focused },
      { [style['has-error']]: errorText },
      { [style.alt]: isAlt },
    );

    const fieldId = generateUniqueId({ name });

    return (
      <div className={dropdownWrapperClassName}>
        {floatingLabelText && (
          <label htmlFor={fieldId}>
            {floatingLabelText}
          </label>
        )}
        <select
          className={style.dropdown}
          name={name}
          id={fieldId}
          disabled={disabled}
          multiple={multiple}
          required={required}
          value={value}
          onChange={this.handleInputChange}
          onBlur={this.handleInputBlur}
          onFocus={this.handleInputFocus}
        >
          {this.renderOptions()}
        </select>
        {/* <div className="border-wrapper">
          <hr aria-hidden="true" />
          <hr aria-hidden="true" />
        </div> */}
        { errorText
          && (
            <div className={style['error-text']}>
              {errorText}
            </div>
          )
        }
      </div>
    );
  }
}

export default withStyles(style)(SelectField);
