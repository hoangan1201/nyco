import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppRouter from './AppRouter';

// this /is/ our ContextProvider
// https://github.com/kriasoft/isomorphic-style-loader
// https://github.com/kriasoft/isomorphic-style-loader/issues/110
class App extends Component {
  static propTypes = {
    context: PropTypes.shape().isRequired,
  };

  static childContextTypes = {
    insertCss: PropTypes.func,
  }

  getChildContext() {
    const { context } = this.props;
    return { ...context };
  }

  render() {
    return <AppRouter {...this.props} />;
  }
}

export default App;
