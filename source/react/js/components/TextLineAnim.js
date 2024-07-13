import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from '../styles/components/text-line-anim.scss';
// import posed from 'react-pose';

// import '../styles/anim-line.scss';

// const transition = {
//   duration: 400,
//   ease: [0.08, 0.69, 0.2, 0.99],
// };

// const Line = posed.div({
//   hidden: { width: 0, transition },
//   visible: { width: 113, transition },
// });

class TextLineAnim extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    isH1: PropTypes.bool.isRequired
    // width: PropTypes.number.isRequired,
    // height: PropTypes.number.isRequired,
    // color: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.initialState = {
      isIn: false,
    };

    this.state = this.initialState;
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        ...this.state,
        isIn: true,
      });
    }, 100);
  }

  render() {
    const { text, isH1 } = this.props;

    const {
      isIn,
    } = this.state;

    const inClasses = classnames(
      style.line,
      { [style.in]: isIn },
    );

    return (
      <div className={style.root}>
        { !isH1 && <div>{text}</div>}
        { isH1 && <h1>{text}</h1>}
        
        <div className={inClasses} />
        {/* <Line
          key="line"
          className="line"
          pose={isIn ? 'visible' : 'hidden'}
        /> */}
      </div>
    );
  }
}

export default withStyles(style)(TextLineAnim);
