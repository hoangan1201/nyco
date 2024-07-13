import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/language-menu.scss';

class LanguageMenu extends Component {
  static propTypes = {
    languageData: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        languageCode: PropTypes.string.isRequired,
      }),
    ).isRequired,
    isActive: PropTypes.bool.isRequired,
    pathname: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isActive !== prevState.isActive) {
      return {
        ...prevState,
        isActive: nextProps.isActive,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    // console.log('LanguageMenu', props);

    this.initialState = {
      isActive: props.isActive,
    };

    this.state = this.initialState;
  }

  splitLanguages(languageData) {
    const chunkSize = 4;
    const chunks = [];
    for (let i = 0; i < languageData.length; i += chunkSize) {
      chunks.push(languageData.slice(i, i + chunkSize));
    }
    return chunks;
  }

  render() {
    const {
      languageData,
      pathname,
      locale,
    } = this.props;
    const { isActive } = this.state;
    const rootClasses = classnames(
      style.root,
      { [style.active]: isActive },
    );


    let currentPage;
    if (locale.length <= 2) {
      currentPage = pathname.slice(3)
    }
    else {
      currentPage = pathname.slice(8)
    }

    !currentPage ? currentPage = '/' : ''

    const languageChunks = this.splitLanguages(languageData);


    return (
      <div className={rootClasses} aria-expanded={isActive}>
        <div className={style.title}>Select your language</div>
        {languageChunks.map((chunk, index) => (
          <div key={index} className={style.menu_links}>
            {chunk.map(({ label, languageCode }) => (
              <div className={style.language_item}>
                <a
                  key={label}
                  tabIndex={isActive ? 0 : -1}
                  href={`/${languageCode}${currentPage}`}
                  className={`${languageCode === locale ? style.active : ''}`}
                >
                  {label}
                </a>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default withStyles(style)(LanguageMenu);
