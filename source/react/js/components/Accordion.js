import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/accordion.scss';
import AccordionItem from './AccordionItem';

class Accordion extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
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
      }),
    ).isRequired,
  };

  constructor(props) {
    super(props);

    const { title } = props.data[0];
    this.initialState = {
      active: {
        [title]: true,
      },
    };

    this.state = this.initialState;
  }

  handleAccordionClick = ({ title }) => {
    const { active } = this.state;
    const updatedActive = !active[title];

    this.setState({
      ...this.state,
      active: {
        ...active,
        [title]: updatedActive,
      },
    });
  }

  render() {
    const { data } = this.props;
    const { active } = this.state;

    return (
      <section className={style.root}>
        {data.map(({
          title, contentTitle, content, contacts, links,
        }) => (
          <AccordionItem
            key={title}
            title={title}
            contentTitle={contentTitle}
            content={content}
            contacts={contacts}
            links={links}
            active={active[title]}
            onClick={() => this.handleAccordionClick({ title })}
          />
        ))}
      </section>
    );
  }
}

export default withStyles(style)(Accordion);
