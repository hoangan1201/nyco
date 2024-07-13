import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { NavLink } from 'react-router-dom';

import NavigationMenu from './NavigationMenu';
import LanguageMenuWrapper from './LanguageMenuWrapper';
import Logo from './Logo';

import style from '../styles/components/header.scss';
import voiceoverStyle from '../styles/components/chart-voiceover.scss';
import hamburgerStyle from '../styles/components/hamburgers.scss';
import { detectActivationEvent } from '../utils/misc';
import { blockFocusOutsideContainer } from '../utils/accessibility';

class Header extends Component {
  static propTypes = {
    isDark: PropTypes.bool,
    onOpen: PropTypes.func,
    onLanguageOpen: PropTypes.func,
    navData: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    languageData: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        languageCode: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    pathname: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
    isMobileView: PropTypes.bool.isRequired,
    onMobileLanguageSelect: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isDark: false,
    onOpen: null,
    onLanguageOpen: null,
  };

  constructor(props) {
    super(props);
    this.intialState = {
      open: false,
      languageOpen: false,
    };

    this.state = this.intialState;
  }

  componentWillUnmount() {
    document.body.style.overflowY = 'initial';
    document.removeEventListener('focusin', this.handleMenuFocus);
  }

  handleMenuFocus(event) {
    blockFocusOutsideContainer(event, document.getElementById('main-menu-container'));
  }

  handleNavigationChange = (event) => {
    if (detectActivationEvent(event)) {
      const { open } = this.state;
      const { onOpen } = this.props;
      this.setState({
        ...this.state,
        open: !open,
      });

      if (onOpen) {
        onOpen({ open: !open });
      }

      if (!open) {
        document.addEventListener('focusin', this.handleMenuFocus);
      } else {
        document.removeEventListener('focusin', this.handleMenuFocus);
      }

      document.body.style.overflowY = !open ? 'hidden' : 'initial';
    }
  }

  handleLanguageMenuClick = (event) => {
    if (detectActivationEvent(event)) {
      const { href } = event.target;
      event.stopPropagation();
      event.preventDefault();
      if (href) {
        document.location = href;
      }
      const { languageOpen } = this.state;
      const { onLanguageOpen } = this.props;
      this.setState({
        ...this.state,
        languageOpen: !languageOpen,
      });

      if (onLanguageOpen) {
        onLanguageOpen({ languageOpen: !languageOpen });
      }
    }
  }

  render() {
    const { open } = this.state;
    const { languageOpen } = this.state;
    const {
      isDark,
      navData,
      languageData,
      pathname,
      locale,
      isMobileView,
      onMobileLanguageSelect,
    } = this.props;
    const hamburgerClasses = classnames(
      hamburgerStyle.hamburger,
      { [hamburgerStyle['hamburger--squeeze']]: true },
      { [hamburgerStyle['is-active']]: open },
    );

    const rootClassNames = classnames(
      { [style.dark]: isDark },
    );

    return (
      <header className={rootClassNames}>
        <div className={style.global_nav}>
          <div>
            Official website of the City of New York
          </div>
          <div className={style.right}>
          <LanguageMenuWrapper
            languageOpen={languageOpen}
            languageData={languageData}
            pathname={pathname}
            locale={locale}
            onClick={this.handleLanguageMenuClick}
            ariaHidden={open}
          />

        </div>
      </div>

      <div className={style.divider}></div>

      <div className={style.service_nav}>
          <Logo locale={locale} ariaHidden={open} />
          <button
            className={hamburgerClasses}
            type="button"
            aria-label={!open ? 'Menu' : 'Close menu'}
            aria-controls="navigation"
            aria-expanded={open}
            tabIndex="0"
            onClick={this.handleNavigationChange}
          >
            <span className={hamburgerStyle['hamburger-box']}>
              <span className={hamburgerStyle['hamburger-inner']} />
            </span>
          </button>
          <nav id="navigation" className={classnames(style.navigation, { [style.active]: open })}>
            <NavigationMenu
                isActive={open}
                isDark={isDark}
                navData={navData}
                pathname={pathname}
                locale={locale}
                onChange={this.handleNavigationChange}
                languageData={languageData}
                isMobileView={isMobileView}
                onMobileLanguageSelect={onMobileLanguageSelect}
            />
          </nav>
      </div>
    </header>
    );
  }
}

export default withStyles(style, hamburgerStyle, voiceoverStyle)(Header);
