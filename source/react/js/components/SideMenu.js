import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import hamburgerStyle from '../styles/components/hamburgers.scss';
import classnames from 'classnames';
import style from '../styles/components/side-menu.scss';


class SideMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navData: props.navData,
      isMenuOpen: false,  // Added to control the visibility of the menu
    };
  }

  setActiveLink = (url = '') => {
    const { navData } = this.state;
    const newNavData = navData.map((item, index) => {
      return { ...item, isActive: (url === '' && index === 0) || item.url === url };
    });
    this.setState({ navData: newNavData });
  }

  toggleMenu = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  componentDidMount() {
    this.setActiveLink(window.location.hash);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeIndex !== this.props.activeIndex) {
      this.setActiveLink();
    }
  }

  render() {
    const { navData, isMenuOpen } = this.state;
    const hamburgerClasses = classnames(
      hamburgerStyle.hamburger,
      hamburgerStyle['hamburger--squeeze'],
      { [hamburgerStyle['is-active']]: isMenuOpen }
    );

    return (
      <nav id='sidebar-menu' className={style.root} aria-label="In page navigation">
        <div className={style.title_container}>
          <div className={style.navbar_title}>On this page</div>
          <button
            className={hamburgerClasses}
            type="button"
            aria-label={!isMenuOpen ? 'Menu' : 'Close menu'}
            aria-expanded={isMenuOpen}
            onClick={this.toggleMenu}
          >
            <span className={hamburgerStyle['hamburger-box']}>
              <span className={hamburgerStyle['hamburger-inner']}></span>
            </span>
          </button>
        </div>
        <div className={`${style.section_container} ${isMenuOpen ? style.show : ''}`}>
          <ul className={style.ul}>
            {navData.map(({ url, label, isActive }, index) => (
              <li key={index} className={isActive ? style.active : ''}>
                <a href={url} onClick={() => this.setActiveLink(url)}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }
}

export default withStyles(style, hamburgerStyle)(SideMenu);