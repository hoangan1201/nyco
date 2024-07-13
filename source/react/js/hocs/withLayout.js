import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { compose } from 'redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import style from '../styles/with-layout.scss';
import formStyle from '../styles/footer.scss';
import {useLocation} from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsletterSignUp from '../components/NewsletterSignUp';

import Modal from '../components/Modal';
// import ModalBackground from '../components/ModalBackground';
import NYCOpportunityIcon from '../components/icons/NYCOpportunity';
import { getComponentDisplayName } from '../utils/misc';
import { accessibilityDomAdjustments, addIdToTopHeading, focusOnHeaderLogo } from '../utils/accessibility'
import { clearModal } from '../actions/modal';

export default ({ isDark }) => (ComposedComponent) => {
  class WithLayout extends Component {
    static displayName = `withLayout(${getComponentDisplayName(ComposedComponent)})`;

    static propTypes = {
      // userAgent: PropTypes.string.isRequired,
      header: PropTypes.shape({
        nav: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            desc: PropTypes.string.isRequired,
          }),
        ),
      }).isRequired,
      footer: PropTypes.shape({
        nav: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
          }),
        ),
      }).isRequired,
      dispatch: PropTypes.func.isRequired,
      modal: PropTypes.shape({
        type: PropTypes.string,
        props: PropTypes.object,
      }).isRequired,
      translatedStrings: PropTypes.shape({}).isRequired,
      intl: PropTypes.shape({
        locale: PropTypes.string.isRequired,
        isRtl: PropTypes.bool.isRequired,
      }).isRequired,
    };

    constructor(props) {
      super(props);

      this.intialState = {
        navigationIsActive: false,
        modalIsOpen: false,
        isMobileView: window.innerWidth < 500,
      };

      this.state = this.intialState;
    }

    componentWillMount() {
      window.scrollTo(0, 0);
      window.addEventListener('resize', this.handleWindowResize);
    }

    componentDidMount() {
      // eslint-disable-next-line global-require
      const WebFont = require('webfontloader');
      focusOnHeaderLogo();
      addIdToTopHeading();
      accessibilityDomAdjustments();

      WebFont.load({
        google: {
          families: ['Lato:400,400i,700,700i', 'Rubik:400,400i,500,500i,600,600i,700'],
        },
        // loading: () => {
        //   console.log('loading');
        // },
        // fontloading: (familyName, fvd) => {
        //   console.log('fontloading', familyName, fvd);
        // },
        // fontactive: (familyName, fvd) => {
        //   console.log('fontactive', familyName, fvd);
        // },
        // fontinactive: (familyName, fvd) => {
        //   console.log('fontinactive', familyName, fvd);
        // },
      });
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleWindowResize);
    }

    handleWindowResize = () => {
      this.setState({
        ...this.state,
        isMobileView: window.innerWidth < 500,
      });
    };

    handleOnOpenNavigation = ({ open }) => {
      this.setState({
        ...this.state,
        navigationIsActive: open,
      });
    }

    handleModalClose = (event) => {
      const { dispatch } = this.props;

      if (event) {
        event.preventDefault();
      }

      dispatch(clearModal());
      // this.setState({
      //   ...this.state,
      //   modalIsOpen: false,
      // });
    }

    handleMobileLanguageSelect = ({ languageCode }) => {
      document.location = `/${languageCode}`;
    }

    render() {
      const {
        // userAgent,
        modal,
        header,
        footer,
        ...passThroughProps
      } = this.props;

      const { isMobileView } = this.state;
      // console.log('userAgent', userAgent);

      const withLayoutClassNames = classnames(
        style.root,
        { [style.dark]: isDark },
      );

      const {
        match,
        location,
        intl,
      } = passThroughProps;

      const modalFocusActive = this.state.navigationIsActive || !!modal.type

      const curRoute = location.pathname.split('/')[2]

      return (
        <div className={withLayoutClassNames} id="main-layout">
          <Header
            isDark={isDark}
            onOpen={this.handleOnOpenNavigation}
            navData={header.nav}
            languageData={header.language}
            url={match.url}
            pathname={location.pathname}
            locale={intl.locale}
            isMobileView={isMobileView}
            onMobileLanguageSelect={this.handleMobileLanguageSelect}
          />
          <main className={style.main} aria-hidden={modalFocusActive}>
            <ComposedComponent
              {...passThroughProps}
              isMobileView={isMobileView}
            />
          </main>
          <Modal
            isOpen={!!modal.type}
            onClose={this.handleModalClose}
            type={modal.type}
            children={modal.children}
            {...modal.props}
          />
          {/* {curRoute === 'subscribe' ? '' : <div className={formStyle.subscribe} aria-hidden={modalFocusActive}>
            <aside>
              <NewsletterSignUp hasTransparentBackground={curRoute === 'common-metrics'} />
            </aside>
          </div>} */}
          <Footer
            navData={footer.nav}
            secondColumn={footer.secondColumn}
            thirdColumn={footer.thirdColumn}
            locale={intl.locale}
            ariaHidden={modalFocusActive}
          />
        </div>
      );
    }
  }

  // const mapState = ({ pages }) => ({ ...pages });
  const mapState = ({ pages, modal }) => {
    const { header, footer } = pages;
    const translatedStrings = pages.translated_strings;
    return {
      header,
      footer,
      translatedStrings,
      modal,
    };
  };

  return compose(
    withStyles(style),
    connect(mapState),
  )(WithLayout);
};
