import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/categories-filtering.scss';
import Checkbox from './Checkbox';
import ChevronDownIcon from './icons/ChevronDown';
import { detectActivationEvent } from '../utils/misc';

class CategoryFiltering extends Component {
  static propTypes = {
    labels: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        children: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string,
            selected: PropTypes.bool,
          }),
        ),
      }),
    ).isRequired,
    onSelect: PropTypes.func.isRequired,
    leftAlign: PropTypes.bool,
    isCheckboxLabel: PropTypes.bool,
    translatedStrings: PropTypes.shape({}).isRequired,
    labelType: PropTypes.number,
  }

  static defaultProps = {
    leftAlign: false,
    isCheckboxLabel: true,
    labelType: 2,
  };

  constructor(props) {
    super(props);

    this.initialState = {
      isOpen: false,
      labels: props.labels,
    };

    this.state = this.initialState;
  }

  componentWillMount() {
    const { labels } = this.props;
    this.setTitle({ labels });
  }

  setTitle = ({ labels }) => {
    const { isCheckboxLabel, translatedStrings, labelType } = this.props;
    let totalAgenciesCount = 0;
    let totalProgramsCount = 0;
    labels.forEach((item) => {
      const filtered = item.children.filter(n => n.selected);
      totalProgramsCount += filtered.length;
      if (filtered.length) {
        totalAgenciesCount += 1;
      }
      return item;
    });

    let title = `${translatedStrings.Agencies} (${totalAgenciesCount}), ${translatedStrings.Programs} (${totalProgramsCount})`;
    if (!isCheckboxLabel) {
      title = `${translatedStrings['Filter Programs']} (${totalProgramsCount})`;
    }

    if(labelType === 1){
      title = totalProgramsCount > 0 ? `Populations (${totalProgramsCount})` : 'Populations';
    } 
    
    this.setState({
      ...this.state,
      title,
    });
  };

  handleToggleDropdown = (event) => {
    // console.log('handleToggleDropdown', event);
    if (detectActivationEvent(event)) {
      const { isOpen } = this.state;
      event.stopPropagation();
      event.preventDefault();

      this.setState({
        ...this.state,
        isOpen: !isOpen,
      });
    }
  };

  // handleSelectProgram = (event, i, parentLabel, label) => {
  handleSelectProgram = (event) => {
    if (detectActivationEvent(event)) {
      const { value } = event.target;
      const { onSelect } = this.props;
      const { labels } = this.state;
      labels.forEach((item) => {
        const p = _.find(item.children, { value });
        if (p) {
          p.selected = !p.selected;
          this.setState({
            ...this.state,
            labels: [
              ...labels,
            ],
          });
        }
      });

      this.setTitle({ labels });

      onSelect({ labels });
    }
  };

  // handleSelectAgency = (event, label) => {
  handleSelectAgency = (event) => {
    if (detectActivationEvent(event)) {
      const { value } = event.target;
      const { onSelect } = this.props;
      const { labels } = this.state;
      // const agency = _.find(labels, { label });
      const agency = _.find(labels, { label: value });
      let newChildren;
      const filtered = agency.children.filter(n => n.selected);
      if (filtered.length === agency.children.length) {
        // all selected so we need to DESELECT all
        // eslint-disable-next-line no-shadow
        newChildren = agency.children.map(({ label, value }) => ({
          label,
          value,
          selected: false,
        }));
      } else {
        // NOT all selected so we need to SELECT all
        // eslint-disable-next-line no-shadow
        newChildren = agency.children.map(({ label, value }) => ({
          label,
          value,
          selected: true,
        }));
      }

      agency.children = newChildren;

      this.setState({
        ...this.state,
        labels: [
          ...labels,
        ],
      });

      this.setTitle({ labels });

      onSelect({ labels });
    }
  };

  handleDismiss = () => {
    const { isOpen } = this.state;
    if (isOpen) {
      this.setState({
        ...this.state,
        isOpen: false,
      });
    }
  };

  handleSelectAll = () => {
    const isCheckAll = this.isCheckAll();

    if(!isCheckAll) {
      const { onSelect } = this.props;
      const { labels } = this.state;
      
      const newLabels = labels.map((item) => {
        return { 
          ...item,
          children: item.children.map((child) => {
            return {
              ...child,
              selected: false,
            }
          })
        }
      })
  
      const newState = {
        ...this.state,
        labels: newLabels
      }
  
      this.setState({ ...newState });
  
      onSelect({ labels: newLabels });
    }
  }

  isCheckAll = () => {
    const { labels } = this.state;
    var isSelectedAll = true;

    labels.map(({children}) => {
      children.map(({selected}) => {
        if(selected === true){
          isSelectedAll = false;
        }
      })
    });

    return isSelectedAll;
  }

  componentDidUpdate(prevProps){
    const { labels, isCheckboxLabel, translatedStrings, labelType } = this.props;
    if(prevProps.labels !== labels) {
      let totalAgenciesCount = 0;
      let totalProgramsCount = 0;
      labels.forEach((item) => {
        const filtered = item.children.filter(n => n.selected);
        totalProgramsCount += filtered.length;
        if (filtered.length) {
          totalAgenciesCount += 1;
        }
        return item;
      });

      let title = `${translatedStrings.Agencies} (${totalAgenciesCount}), ${translatedStrings.Programs} (${totalProgramsCount})`;
      if (!isCheckboxLabel) {
        title = `${translatedStrings['Filter Programs']} (${totalProgramsCount})`;
      }

      if(labelType === 1){
        title = totalProgramsCount > 0 ? `Populations (${totalProgramsCount})` : 'Populations';
      } 

      this.setState({
        ...this.state,
        labels: labels,
        title,
      });
    }
  }

  render() {
    const { title, isOpen, labels } = this.state;
    const { leftAlign, isCheckboxLabel, formatLabel } = this.props;

    const headerClassName = classnames(
      style.header,
      { [style.open]: isOpen },
    );

    const headerBtnStyles = classnames(
      style.headerBtn,
      { [style.left]: leftAlign },
      { [style.programs]: !isCheckboxLabel },
    );

    const dropdownStyles = classnames(
      style.dropdown,
      { [style.programs]: !isCheckboxLabel },
    );

    const ulStyles = classnames(
      { [style.programs]: !isCheckboxLabel },
    );

    const agencyListStyles = classnames(
      style.agencyList,
      { [style.programs]: !isCheckboxLabel },
    );

    const isCheckAll = this.isCheckAll();

    return (
      <div className={style.root}>
        {isOpen
          && (
            <div
              role="presentation"
              className={style.background}
              onClick={this.handleDismiss}
            />
          )
        }
        <div
          tabIndex="0"
          role="button"
          className={headerClassName}
          onClick={this.handleToggleDropdown}
          onKeyDown={this.handleToggleDropdown}
        >
          <div className={headerBtnStyles}>
            {title}
            <span className={style['icon-wrapper']}>
              <ChevronDownIcon
                fill={isOpen ? '#C9EEFE' : '#3194E0'}
                width={15}
                height={8}
              />
            </span>
          </div>
        </div>
        {isOpen && (
          <div className={dropdownStyles}>
            <ul className={ulStyles}>
              {labels.map((label) => {
                const filtered = label.children.filter(n => n.selected);
                const headerBtnStyle = classnames(
                  style.agencyBtn,
                  { [style.selected]: filtered.length === label.children.length },
                );

                // first determine if we are indeterminate...
                const indeterminate = label.children.length !== filtered.length
                  && filtered.length >= 1;

                // ... then use that to determine if we are checked
                const checked = indeterminate ? false : filtered.length === label.children.length;
                return (
                  <li
                    key={label.label}
                    className={agencyListStyles}
                  >
                    {isCheckboxLabel ? (
                      <div className={headerBtnStyle}>
                        <Checkbox
                          label={label.label}
                          name={label.label}
                          value={label.label}
                          checked={checked}
                          onChange={this.handleSelectAgency}
                          indeterminate={indeterminate}
                        />
                      </div>
                    ) : (
                      <div className={style.filterHeading}>
                        {label.label}
                      </div>
                    )}
                    {label.children && (
                      <ul className={`${isCheckboxLabel ? style.nested : ''}`}>
                        {label.children.map((child) => {
                          const btnClassName = classnames(
                            style.programBtn,
                            { [style.selected]: child.selected },
                          );
                          return (
                            <li key={child.label}>
                              <div className={btnClassName}>
                                <Checkbox
                                  label={child.label}
                                  name={child.label}
                                  value={child.value}
                                  checked={child.selected}
                                  onChange={this.handleSelectProgram}
                                />
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(style)(CategoryFiltering);
