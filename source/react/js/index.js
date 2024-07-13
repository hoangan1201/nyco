import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// sk: todo: understand when to use which
// const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

const context = {
  insertCss: (...styles) => {
    // eslint-disable-next-line no-underscore-dangle
    const removeCss = styles.map(x => x._insertCss());
    return () => {
      removeCss.forEach(f => f());
    };
  },
};

ReactDOM.render(
  <App context={context} />,
  document.getElementById('workforce-data-portal-app'),
);

if (module.hot) {
  module.hot.accept();
}
