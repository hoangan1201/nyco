import React, { Component } from 'react';
import posed from 'react-pose';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classnames from 'classnames';
import ArrowDownIcon from './icons/ArrowDown';
import ArrowButton from './ArrowButton';
import TextLineAnim from './TextLineAnim';

import style from '../styles/components/introduction-section.scss';
import PropTypes from 'prop-types';

const transition = {
  duration: 400,
  ease: [0.08, 0.69, 0.2, 0.99],
};

const WelcomeTextAnimation = posed.div({
  hidden: { y: 50, opacity: 0, transition, zIndex: -1 },
  visible: { y: 0, opacity: 1, transition, zIndex: 0 },
});

// const Line = posed.div({
//   hidden: { width: 0, transition },
//   visible: { width: 113, transition },
// });

class Introduction extends Component {
  static propTypes = {
    homepageDescription: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.initialState = {
      isVisible: false,
    };

    this.state = this.initialState;

    this.ticking = false;
    this.fadeStart = 100;
    this.fadeUntil = 500;
  }


  componentDidMount() {
    setTimeout(() => {
      const { isVisible } = this.state;
      this.setState({
        isVisible: !isVisible,
      });
    }, 500);

    // window.addEventListener('scroll', this.handleScroll);
  }

  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.handleScroll);
  // }

  handleLetsGoClick = () => {
    const targetId = window.App.pages.letsGoDestination ? window.App.pages.letsGoDestination : 'common-metrics';
    const target = document.getElementById(targetId);
    // console.log('target.getBoundingClientRect()', target.getBoundingClientRect());
    // console.log('window.pageYOffset', window.pageYOffset);
    if (target || targetId.includes('/')) {
      if (targetId.includes('/')){
        location.href=targetId;
      }
      else {
        const scrollY = target.getBoundingClientRect().y - 200;
        window.scrollTo(0, scrollY);
      }
    }
    // window.scrollTo(0, 100);
    // document.getElementById('common-metrics').scrollTop(0);
  };

  // handleScroll = () => {
  //   // lastScrollY = window.scrollY;

  //   if (!this.ticking) {
  //     window.requestAnimationFrame(() => {
  //       const offset = document.documentElement.scrollTop;
  //       let opacity = 0;

  //       if (offset < this.fadeStart) {
  //         opacity = 1;
  //       } else if (offset <= this.fadeUntil) {
  //         opacity = 1 - (offset - this.fadeStart) / (this.fadeUntil - this.fadeStart);
  //       }
  //       document.getElementById('intro-fade').style.opacity = opacity;
  //       if (opacity===0) {
  //         document.getElementById('introduction').style['z-index'] = -1;
  //       }
  //       else {
  //         document.getElementById('introduction').style['z-index'] = 1;
  //       }
  //       this.ticking = false;
  //     });


  //     this.ticking = true;
  //   }
  // };

  render() {
    const { isVisible } = this.state;
    const { homepageDescription } = this.props;
  const rootStyle = classnames(
    style.root,
    { [style.hidden]: !isVisible },
    { [style.animationStart]: isVisible },
  );

    return (
      <section id="introduction" className={rootStyle}>
        <div id="intro-fade" className={style.contentWrapper}>
          <div className={style.animWrapper}>
            <TextLineAnim
              text="Welcome"
              isH1={true}
              // width={11.3}
              // height={0.2}
              // color="#3194E0"
            />
          </div>

          <div className={style.welcomeTextWrapper}>
            <WelcomeTextAnimation
              pose={isVisible ? 'visible' : 'hidden'}
            >
              {/* TODO: Remove the <p> inside this h2 through CMS */}
              <div dangerouslySetInnerHTML={{__html:homepageDescription}}/>
              <div className={style.letsGo}>
                <ArrowButton
                  label="Let's Go!"
                  icon={<ArrowDownIcon size={15} />}
                  withLine
                  onClick={this.handleLetsGoClick}
                  ariaHidden={true}
                />
              </div>
            </WelcomeTextAnimation>
          </div>
        </div>
      </section>
    );
  }
}

export default withStyles(style)(Introduction);
