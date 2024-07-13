import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/language-menu-wrapper.scss';
import LanguageMenu from './LanguageMenu';
import LanguageSvg from './svg/LanguageSvg';

const LanguageMenuWrapper = ({
  languageOpen,
  languageData,
  pathname,
  onClick,
  locale,
  ariaHidden
}) => {
  // Find the current language object using the locale
  const currentLanguage = languageData.find(lang => lang.languageCode === locale);

  return (
    <div className={`${style.languageDropdown} ${languageOpen ? style.expanded : ''}`} aria-hidden={ariaHidden}>
      <div
        className={style.languageIconWrapper}
        role="button"
        onClick={onClick}
        onKeyDown={onClick}
        aria-label="Language menu"
        aria-expanded={languageOpen}
        aria-hidden={ariaHidden}
        tabIndex={0}
      >
        Language | {currentLanguage ? currentLanguage.label : 'Language'} 
        <div>
          <LanguageSvg rotated={languageOpen} /> 
        </div>
      </div>

      <LanguageMenu
        isActive={languageOpen}
        languageData={languageData}
        pathname={pathname}
        locale={locale}
      />
    </div>
  );
};

LanguageMenuWrapper.propTypes = {
  languageOpen: PropTypes.bool.isRequired,
  languageData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      languageCode: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  pathname: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  ariaHidden: PropTypes.bool,
};

export default withStyles(style)(LanguageMenuWrapper);
