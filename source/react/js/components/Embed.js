import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

class Embed extends Component {
  static propTypes = {
    embedCode: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.divRef = createRef();
  }

  componentDidMount() {
    const { embedCode } = this.props; 
    const parsedHTML = document.createRange().createContextualFragment(embedCode.toString())
    this.divRef.current.appendChild(parsedHTML)
    this.divRef.current.style.width = '100%;'
  }

  render() {
    return <div ref={this.divRef}></div>
  }
};

export default Embed;