import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import posed from 'react-pose';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/common-metrics-section.scss';
// import ArrowDownIcon from './icons/ArrowDown';
// import TextLineAnim from './TextLineAnim';
import ColorBar from './ColorBar';
import SectionTitle from './SectionTitle';
// import DataStoryCard from './DataStoryCard';

import CommonMetricsNYCIcon from './icons/CommonMetricsNYC';
// import GraphBarIcon from './icons/GraphBar';
// import GraphSankeyIcon from './icons/GraphSankey';
import DataStoriesGrid from '../containers/DataStoriesGrid';

// const transition = {
//   duration: 400,
//   ease: [0.08, 0.69, 0.2, 0.99],
// };
//
// const Explanation = posed.div({
//   hidden: { y: 50, opacity: 0, transition },
//   visible: { y: 0, opacity: 1, transition },
// });
//
// const Line = posed.div({
//   hidden: {
//     width: 0,
//     transition,
//   },
//   visible: {
//     width: 113,
//     transition,
//   },
// });


class CommonMetricsSection extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    isMobileView: PropTypes.bool.isRequired,
    translatedStrings: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);
    this.initialState = {
      isVisible: false,
    };

    this.state = this.initialState;
  }

  componentDidMount() {
    setTimeout(() => {
      const { isVisible } = this.state;
      this.setState({
        isVisible: !isVisible,
      });
    }, 1000);
  }

  render() {
    const { isVisible } = this.state;
    const {
      locale,
      isMobileView,
      translatedStrings,
    } = this.props;
    let primaryBarColors = ["#3194E0", "#C9EEFE", "#0C264D", "#003C7A", "#071F42"];
    let secondaryBarColors = ["#81a1e6", "#a8dd7c", "#d2fcaf", "#c1c7f5", "#b0afe9"];

    if(window.App.pages.primaryBarColors.length === 5) {
      primaryBarColors = window.App.pages.primaryBarColors;
    }

    if(window.App.pages.secondaryBarColors.length === 5) {
      secondaryBarColors = window.App.pages.secondaryBarColors;
    }

    const barHeight = isMobileView ? '2.5rem' : '5rem';

    return (
      <section id="common-metrics" className={style.root}>
        <div className={style.margins}>
          <div className={style.content}>

            <div className={style['color-bars']}>
              <div className={`${style.row} ${style['offset-1']}`}>
                <ColorBar
                  color={primaryBarColors[0]}
                  width="5rem"
                  height={barHeight}
                  isVisible={isVisible}
                />
                <ColorBar
                  color={primaryBarColors[1]}
                  width="50rem"
                  height={barHeight}
                  isVisible={isVisible}
                />
              </div>
              <div className={style.row}>
                <ColorBar
                  color={primaryBarColors[2]}
                  width="22rem"
                  height={barHeight}
                  isVisible={isVisible}
                />
                <ColorBar
                  color={primaryBarColors[3]}
                  width="64rem"
                  height={barHeight}
                  isVisible={isVisible}
                />
                <ColorBar
                  color={primaryBarColors[0]}
                  width="22rem"
                  height={barHeight}
                  isVisible={isVisible}
                />
              </div>
              <div className={`${style.row} ${style['offset-2']}`}>
                <ColorBar
                  color={primaryBarColors[4]}
                  width="106rem"
                  height={barHeight}
                  isVisible={isVisible}
                />
              </div>
            </div>

            <div className={style['metrics-header']}>
              <CommonMetricsNYCIcon
                width={408}
                height={464}
              />
              <div className={style['metrics-header-title-wrapper']}>
                <SectionTitle
                  title={translatedStrings.common_metric_title}
                  text={translatedStrings.common_metric_homepage_description}
                  buttonLabel="Explore the Whole Set"
                  buttonCTA={`/${locale}/common-metrics`}
                  isMobileView={isMobileView}
                />
              </div>
            </div>

            <div className={style['color-bars']}>
              <div className={style.row}>
                <ColorBar
                  color={secondaryBarColors[0]}
                  // width="71rem"
                  width="128rem"
                  height={barHeight}
                  isVisible={isVisible}
                />
              </div>
              <div className={`${style.row} ${style['offset-3']}`}>
                <ColorBar
                  color={secondaryBarColors[1]}
                  width="16rem"
                  height={barHeight}
                  isVisible={isVisible}
                />
                <ColorBar
                  color={secondaryBarColors[2]}
                  width="66.5rem"
                  height={barHeight}
                  isVisible={isVisible}
                />
              </div>
              <div className={`${style.row} ${style['offset-2']}`}>
                <ColorBar
                  color={secondaryBarColors[3]}
                  width="70rem"
                  height={barHeight}
                  isVisible={isVisible}
                />
                <ColorBar
                  color={secondaryBarColors[4]}
                  width="30rem"
                  height={barHeight}
                  isVisible={isVisible}
                />
              </div>
            </div>

            <DataStoriesGrid
              locale={locale}
              isHomepage
              isMobileView={isMobileView}
              translatedStrings={translatedStrings}
              isTitleH1={false}
            />

          </div>
        </div>
      </section>
    );
  }
}

export default withStyles(style)(CommonMetricsSection);
