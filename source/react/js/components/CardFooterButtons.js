import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/card-footer-buttons.scss';
import TableIcon from './icons/Table';
import DownloadIcon from './icons/Download';
import ChevronDownIcon from './icons/ChevronDown';
import StandardIconButton from './StandardIconButton';
import { putFocusOnElement } from '../utils/accessibility';

class CardFooterButtons extends Component {
  static propTypes = {
    labels: PropTypes.arrayOf(
      PropTypes.string,
    ).isRequired,
    onChange: PropTypes.func.isRequired,
    chartContainerId: PropTypes.string
  };

  constructor(props) {
    super(props);

    const overButton = {};
    props.labels.forEach((label) => {
      overButton[label] = false;
    });

    this.initialState = {
      overButton,
      isSelectOpen: false,
      selectOptions: [
        { format: 'svg', label: 'SVG Vector Image', type: 'image/svg+xml', isSelected: false },
        { format: 'png', label: 'PNG Image', type: 'image/png', isSelected: false },
        { format: 'jpg', label: 'JPEG Image', type: 'image/jpeg', isSelected: false },
        // Disabled untill pdf export server is up
        // { format: 'pdf', label: 'PDF Document', type: 'application/pdf', isSelected: false }
      ]
    };

    this.state = this.initialState;
  }

  handleButtonMouseOverOut = ({ label }) => {
    const { overButton } = this.state;
    this.setState({
      ...this.state,
      overButton: {
        ...overButton,
        [label]: !overButton[label],
      },
    });
  }

  handleButtonClick = ({ tabId }) => {
    const { onChange, labels, chartContainerId } = this.props;
    const { isSelectOpen } = this.state;
    const isChart = labels[1].search('Chart') !== -1 || labels[1].search('Map') !== -1 ? true : false;

    if(tabId === 1) {
      if(isChart) {
        this.setState({ ...this.state, isSelectOpen: !isSelectOpen });
      } else {
        onChange({ tabId });
      }
    } else {
      putFocusOnElement({ elementId: chartContainerId, preventScroll: true });
      
      onChange({ tabId });
    }
  }

  handleSelectClick = ({ tabId, format }) => {
    const { onChange } = this.props;
    const { selectOptions, isSelectOpen } = this.state;
    const newSelectOptions = selectOptions.map(option => {
      if(format === option.format) {
        return {
          ...option,
          isSelected: true
        }
      }

      return {
        ...option,
        isSelected: false
      }
    });
    const selectedOption = newSelectOptions.filter(option => option.isSelected);

    this.setState({ 
      ...this.state, 
      isSelectOpen: !isSelectOpen
    });

    onChange({ tabId, ...selectedOption[0] });
  }

  render() {
    const { labels } = this.props;
    const { overButton, selectOptions, isSelectOpen } = this.state;
    const selectClasses = classnames(
      style['select-options'],
      isSelectOpen ? style['open'] : ''
    );
    const exportOption = labels[1].search('Chart') !== -1 || labels[1].search('Map') !== -1 ? true : false;

    return (
      <div className={style.root} role="tablist" aria-label="Switch between table and chart view">
        {labels.map((label, i) => {
          const icon = i === 0
            ? (
              <TableIcon
                size={20}
                fill='#C9EEFE'
              />
            ) : (
              <DownloadIcon
                size={20}
                fill='#C9EEFE'
              />
            );

          return (
            <div className={style['width-50']} key={label}>
              <StandardIconButton
                label={label}
                icon={icon}
                onMouseOverOut={this.handleButtonMouseOverOut}
                onClick={() => this.handleButtonClick({ tabId: i })}
                ariaExpanded={isSelectOpen}
                ariaChecked={!labels[0].toLowerCase().includes('table')}
              />
              {
                (exportOption && i === 1) &&
                <div className={selectClasses}>
                  {selectOptions.map((option, j) => {
                    const optionClasses = classnames(
                      style['option'],
                      option.isSelected ? style['selected'] : ''
                    );
                    return (
                      <a 
                        key={j} 
                        className={optionClasses} 
                        onClick={() => this.handleSelectClick({ tabId: i, format: option.format })}
                      >
                        {option.label}
                      </a>
                    )
                  })}
                </div>
              }
            </div>
          );
        })}
      </div>
    );
  }
}

export default withStyles(style)(CardFooterButtons);
