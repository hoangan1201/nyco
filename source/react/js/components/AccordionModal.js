import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/accordion-modal.scss';
import Accordion from './Accordion';

const AccordionModal = ({ title, data }) => (
  <div className={style.root}>
    <div className={style.meta}>
      <h3>{title}</h3>
    </div>
    <div className={style.accordionWrapper}>
      <Accordion
        data={data}
      />
    </div>
  </div>
);

AccordionModal.propTypes = {
  title: PropTypes.string.isRequired,
  // TODO: flush this object out when we are hooked up to DB
  data: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
};

export default withStyles(style)(AccordionModal);
