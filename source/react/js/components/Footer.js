import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/footer.scss';

import NYCIcon from './icons/NYC';
import PrimaryLogo from "./icons/PrimaryLogo";
import PrimaryLogo_WorkforceDev from './icons/PrimaryLogoWorkforceDev';
import Logo from './Logo';
import LinkOut from './icons/LinkOut';

const Footer = ({ navData, thirdColumn, secondColumn, locale, ariaHidden }) => {
  return (
    <footer className={style.footer} aria-hidden={ariaHidden}>
      <div className={style.service_footer}>
        <div className={style.main_links}>
          <div className={style.feedback}>
            <div className={style.feedback_title}>How can we improve?</div>
            <div>
              {/* add link for button? */}
              <button>Send us feedback</button> 
            </div>
          </div>

          <div className={style.divider} />

          <div className={style.links}>
            <div className={style.first_col}>
              {navData.slice(0, 2).map(({ url, label }, i) => (
              <NavLink to={`/${locale}/${url}`} className={style.nav_item} key={i}>{label}</NavLink>
              ))}
            </div>
            <div className={style.second_col}>
              {navData.slice(2).map(({ url, label }, i) => (
              <NavLink to={`/${locale}/${url}`}  className={style.nav_item} key={i}>{label}</NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={style.global_footer}>
        <div className={style.main_links}>

          <div className={style.feedback}>
              <NYCIcon width={100} height={40} />
              <span>Connecting you to NYC services.</span>
          </div>

          <div className={style.links}>
            <div className={style.first_col}>
              <a href='https://www.nyc.gov/home/terms-of-use.page' target='_blank' rel="noopener noreferrer" className={style.nav_item}>Terms of Use</a>
              <a href='https://www.nyc.gov/site/mopd/resources/digital-accessibility.page' target='_blank' rel="noopener noreferrer" className={style.nav_item}>Digital Accessibility</a>
            </div>

            <div className={style.second_col}>
              <a href='https://www.nyc.gov/home/privacy-policy.page' target='_blank' rel="noopener noreferrer" className={style.nav_item}>Privacy Policy</a>
            </div>

          </div>
        </div>

        <div className={style.divider} />

        <div className={style.copyright_mark}>
            &copy; {(new Date().getFullYear())} City of New York. All Rights Reserved. NYC is a trademark and service mark of the City of New York
        </div>
      </div>
    </footer>

  );
};

Footer.propTypes = {
  navData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,

};


export default withStyles(style)(Footer);

