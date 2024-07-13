import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from '../styles/components/expand-collapse.scss';
import PlusIcon from './icons/Plus';
import MinusIcon from './icons/Minus';
import ExclamationMarkIcon from './icons/ExclamationMark';
import _ from 'lodash';

class ExpandCollapse extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.initialState = {
      isOpen: false,
    };

    this.state = this.initialState;
  }

  handleClick = () => {
    const { isOpen } = this.state;
    this.setState({ ...this.state, isOpen: !isOpen });
  }

  render() {
    const { title, content } = this.props;
    const { isOpen } = this.state;
    const contentClasses = classnames(style.content, isOpen ? style.open : '');
    const rightIcon = isOpen ? <MinusIcon size={14} /> : <PlusIcon size={14} />;

    return (
      <div className={style.root}>
        <div
          className={style.header}
          onClick={() => this.handleClick()}
          aria-controls={`expandable_content_${_.kebabCase(title)}`}
          aria-expanded={isOpen}
          role="button"
        >
          <ExclamationMarkIcon size={20} />
          <div className={style.headerTitle}>{title}</div>
          {rightIcon}
        </div>
        <div className={contentClasses} id={`expandable_content_${_.kebabCase(title)}`}>
          <div 
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    );
  }
}

export default withStyles(style)(ExpandCollapse);
