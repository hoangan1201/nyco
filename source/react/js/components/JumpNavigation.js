import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classnames from 'classnames';

import style from '../styles/components/jump-navigation.scss';

// import ChevronDownIcon from './icons/ChevronDown';
import JumpNavigationToggleButton from './JumpNavigationToggleButton';
import JumpNavigationButton from './JumpNavigationButton';

class JumpNavigation extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired,
      }),
    ).isRequired,
    onToggle: PropTypes.func,
    onJump: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onToggle: null,
  };

  constructor(props) {
    super(props);

    let activeIndex;
    props.data.forEach((item, i) => {
      if (item.active) {
        activeIndex = i;
      }
    });

    this.initialState = {
      activeIndex,
      isOpen: false,
      isIn: false,
    };

    this.state = this.initialState;
  }

  handleToggle = () => {
    const { activeIndex, isOpen } = this.state;
    const { onToggle } = this.props;

    this.setState({
      ...this.state,
      isOpen: !isOpen,
      isIn: false,
    });

    if (!isOpen) {
      const target = document.getElementById(`jump-nav-toggle-${activeIndex}`);
      if (target) {
        const targetTop = target.getBoundingClientRect().top;
        const targetHeight = target.getBoundingClientRect().height;
        // window.scrollBy(0, (targetTop + (targetHeight / 2)) - (window.innerHeight >> 1));
        // eslint-disable-next-line no-bitwise
        // window.scrollBy(0, (targetTop + (targetHeight >> 1)) - (window.innerHeight >> 1));
        window.scrollBy(0, (targetTop + (targetHeight / 2)) - (window.innerHeight / 2));
      }
    }

    if (onToggle) {
      onToggle({ isOpen });
    }
  };

  handleJump = ({ index }) => {
    const { onJump } = this.props;

    this.setState({
      ...this.state,
      isOpen: false,
      isIn: false,
    });

    onJump({ index });
  };

  handleOnTransitionEnd = () => {
    const { isOpen } = this.state;
    this.setState({
      ...this.state,
      isIn: isOpen,
    });
  }

  render() {
    const { isOpen, activeIndex } = this.state;
    // isIn not needed here?
    const { data } = this.props;
    // let direction = 'up';

    const rootStyles = classnames(
      style.root,
      { [style.open]: isOpen },
    );

    return (
      <div className={rootStyles}>
        {data.map((item, index) => {
          if (item.active) {
            return (
              <div
                id={`jump-nav-toggle-${activeIndex}`}
                key={item.label}
                data-position={index}
                className={`${style['jump-nav-toggle']} ${isOpen ? style.open : ''}`}
              >
                <JumpNavigationToggleButton
                  onClick={this.handleToggle}
                  count={`${index + 1} / ${data.length}`}
                  label={item.label}
                  isOpen={isOpen}
                />
              </div>
            );
          }
          //
          // if (index > activeIndex) {
          //   direction = 'down';
          // }

          let itemStyle = {};
          if (isOpen) {
            itemStyle = {
              transform: `translateY(${(index - activeIndex) * 100}%)`,
            };
          }
          let hasTopBorder = false;
          let hasBottomBorder = false;
          if (index === 0 && index < activeIndex) {
            hasTopBorder = true;
          }
          if (index === data.length - 1 && index > activeIndex) {
            hasBottomBorder = true;
          }

          return (
            <div
              key={item.label}
              // className={`jump-nav-item${isOpen ? ' open' : ''}${isIn ? ' in' : ''}`}
              // className={`${style['jump-nav-item']} ${isOpen ? styl
              // e.open : ''} ${isIn ? style.in : ''}`}
              className={`${style['jump-nav-item']} ${isOpen ? style.open : ''}`}
              // data-direction={direction}
              data-top-border={hasTopBorder}
              data-bottom-border={hasBottomBorder}
              data-position={index}
              style={itemStyle}
              onTransitionEnd={this.handleOnTransitionEnd}
            >
              <JumpNavigationButton
                count={`${index + 1} / ${data.length}`}
                onClick={this.handleJump}
                label={item.label}
                index={index}
              />
            </div>
          );
          // if (isOpen) {
          //   return (
          //     <div className="jump-nav-item-wrapper">
          //       <JumpNavigationButton
          //         key={item.label}
          //         count={`${index + 1} / ${data.length}`}
          //         onClick={this.handleJump}
          //         label={item.label}
          //       />
          //     </div>
          //   );
          // }

          // return null;
        })}
      </div>
    );
  }
}

export default withStyles(style)(JumpNavigation);
