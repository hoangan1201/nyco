import React from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/accordion-item.scss';
import PlusIcon from './icons/Plus';
import MinusIcon from './icons/Minus';
import ArrowRightIcon from './icons/ArrowRight';

const AccordionItem = ({
  title,
  content,
  onClick,
  active,
  contentTitle,
  contacts,
  links,
}) => (
  <div className={style.root}>
    <button
      onClick={onClick}
      type="button"
      className={style.accordionItem}
    >
      <span className={style.svgWrapper}>
        {active
          ? <MinusIcon width="1.3rem" height="0.3rem" />
          : <PlusIcon size="1.3rem" />
        }
      </span>
      <span className={style.labelWrapper}>
        {title}
      </span>
    </button>
    {active && (
      <div className={style.content}>
        <h4>{contentTitle}</h4>
        <p>{content}</p>
        <div className={style.contentDetails}>
          <div className={style.contacts}>
            <h4>Primary Contact</h4>
            {contacts.map(({ name, phone }) => (
              <div className={style.contactMeta} key={name}>
                <p>
                  {name}
                  <br />
                  <a href={`tel:${phone}`}>{phone}</a>
                </p>
              </div>
            ))}
          </div>
          <div className={style.links}>
            <h4>Social Media</h4>
            {links.map(({ label, url }) => (
              <p key={label}>
                <a href={url}>{label}</a>
                <ArrowRightIcon size="1.2rem" fill="#031837" />
              </p>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>
);

AccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
  contentTitle: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
    }),
  ).isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string,
    }),
  ).isRequired,
};

AccordionItem.defaultProps = {
  active: false,
};

export default withStyles(style)(AccordionItem);
