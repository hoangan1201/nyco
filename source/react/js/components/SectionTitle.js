import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { NavLink } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';

import style from '../styles/components/section-title.scss';
import ArrowRightIcon from './icons/ArrowRight';

class SectionTitle extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    buttonLabel: PropTypes.string,
    buttonCTA: PropTypes.string,
    isMobileView: PropTypes.bool,
    isH1: PropTypes.bool
  };

  static defaultProps = {
    buttonLabel: null,
    buttonCTA: null,
    isMobileView: false,
    isH1: false
  };

  constructor(props) {
    super(props);

    this.initialState = {
      isIn: false,
    };

    this.state = this.initialState;
  }

  handleEnter = () => {
    const { isIn } = this.state;
    if (!isIn) {
      this.setState({
        ...this.state,
        isIn: true,
      });
    }
  }

  htmlDecode = (input) => {
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  };

  render() {
    const {
      title,
      text,
      buttonLabel,
      buttonCTA,
      isMobileView,
      isH1
    } = this.props;
    const { isIn } = this.state;
    const text_desc = this.htmlDecode(text);

    return (
      <Waypoint
        scrollableAncestor={window}
        onEnter={this.handleEnter}
        bottomOffset="20%"
      >
        <section className={`${style.root} ${isIn ? style.in : ''}`}>
          {isH1 ? <h1 className={style.title}>{title}</h1> : <h2 className={style.title}>{title}</h2>}
          
          <div className={style.text}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{__html:text_desc}}
          />
          { buttonLabel && buttonCTA && (
            <div className={style.navLinkWrapper}>
              <NavLink to={buttonCTA}>
                {buttonLabel}
                <span className={style.iconWrapper}>
                  <ArrowRightIcon size={isMobileView ? 10 : 15} />
                </span>
              </NavLink>
            </div>
          )}
        </section>
      </Waypoint>
    );
  }
}

export default withStyles(style)(SectionTitle);
