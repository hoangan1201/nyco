import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/sidebar-sticky.scss';

class SidebarSticky extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);

    this.initialState = {
      isSticky: false,
      isBottom: false,
      headerHeight: 160,
    };

    this.state = this.initialState;
    this.elementRef = React.createRef();
  }

  handleScroll = () => {
    const { isSticky, isBottom, headerHeight } = this.state;
    const elementPositionTop = this.elementRef.current.getBoundingClientRect().top+100;
    const elementPositionBottom = this.elementRef.current.getBoundingClientRect().bottom;
    const sidebarMenuHeight = document.getElementById('sidebar-menu').getBoundingClientRect().height;
    const newIsSticky = elementPositionTop < headerHeight;
    const newIsBottom = elementPositionBottom < (sidebarMenuHeight + headerHeight);

    if(isSticky !== newIsSticky || isBottom !== newIsBottom){
      this.setState({
        ...this.state,
        isSticky: newIsSticky,
        isBottom: newIsBottom,
      });
    }
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, { passive: true });
  }

  render() {
    const { children } = this.props;
    const { isSticky, isBottom } = this.state;

    return (
      <div ref={this.elementRef} className={style.root}>
        <div className={isBottom ? style.stickyBottom : isSticky ? style.sticky : ''}>
          {children}
        </div>
      </div>
    );
  }
}

export default withStyles(style)(SidebarSticky);
