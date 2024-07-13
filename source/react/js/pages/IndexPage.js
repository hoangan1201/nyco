import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
// import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classnames from 'classnames';

import page from '../hocs/page';

import style from '../styles/index.scss';

import IntroductionSection from '../components/IntroductionSection';
import CommonMetricsSection from '../components/CommonMetricsSection';

class IndexPage extends Component {
  static propTypes = {
    match: PropTypes.shape({
      isExact: PropTypes.bool,
      params: PropTypes.shape({
        lang: PropTypes.string.isRequired,
      }),
      path: PropTypes.string,
      url: PropTypes.string,
    }).isRequired,
    intl: PropTypes.shape({
      locale: PropTypes.string.isRequired,
      isRtl: PropTypes.bool.isRequired,
    }).isRequired,
    isMobileView: PropTypes.bool.isRequired,
    translatedStrings: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);

    this.initialState = {
      isVisible: false,
    };

    this.state = this.initialState;

    // console.log('IndexPage', props);
  }

  componentDidMount() {
    setTimeout(() => {
      const { isVisible } = this.state;
      this.setState({
        isVisible: !isVisible,
      });
    }, 500);
  }


  htmlDecode = (input) => {
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  };

  render() {
    const { isMobileView, intl, translatedStrings } = this.props;
    const homepageDescription = this.htmlDecode(window.homepage_description);
    const rootStyles = classnames(
      style.root,
      { [style.rtl]: intl.isRtl },
    );

    return (
      <div className={rootStyles}>
        <IntroductionSection homepageDescription={homepageDescription} />
        <CommonMetricsSection
          locale={intl.locale}
          isMobileView={isMobileView}
          translatedStrings={translatedStrings}

        />
      </div>
    );
  }
  // render() {
  //   const { isFetching, pageData } = this.props;
  //   if (isFetching) {
  //     return <h2>Loading...</h2>;
  //   }
  //
  // sk: please leave this here for now
  //   return (
  //     <section className={`${style.black} ${style['white-txt']}`}>
  //       <h1>Pages</h1>
  //       <div id={pageData.id} className="pageData">
  //         <h2>{`title: ${pageData.title}`}</h2>
  //         <div>{`created_at: ${pageData.created_at}`}</div>
  //         <div>{`updated_at: ${pageData.updated_at}`}</div>
  //         <div>{`expire_date: ${pageData.expire_date}`}</div>
  //         <div>{`pub_date: ${pageData.pub_date}`}</div>
  //         <div>{`status: ${pageData.status}`}</div>
  //         <div>{`slug: ${pageData.slug}`}</div>
  //         <div>{`copy: ${pageData.copy}`}</div>
  //       </div>
  //     </section>
  //   );
  // }
}

// const mapStateToProps = ({ pages }) => {
//   const { isFetching } = pages;
//   return {
//     pageData: pages.page,
//     isFetching,
//   };
// };


export default compose(
  page(),
  // connect(mapStateToProps),
  withStyles(style),
)(IndexPage);
