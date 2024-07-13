import React, { Component } from 'react';
import { Provider } from 'react-redux';

import initRedux from '../utils/initRedux';
import { getComponentDisplayName } from '../utils/misc';

export default ComposedComponent => class WithRedux extends Component {
    static displayName = `WithRedux(${getComponentDisplayName(ComposedComponent)})`

    constructor(props) {
      super(props);
      this.redux = initRedux();
    }

    render() {
      return (
        <Provider store={this.redux}>
          <ComposedComponent {...this.props} />
        </Provider>
      );
    }
};
