import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';
import {
  isClient,
  isProduction,
} from './misc';

let reduxStore = null;

let devtools = f => f;
if (isClient && !isProduction && window.navigator.userAgent.includes('Chrome')) {
  devtools = (window.devToolsExtension && window.devToolsExtension()) || (f => f);
}

function create(initialState = { ...window.App }) {
  const combinedReducers = combineReducers({
    ...reducers,
  });

  const enhancers = compose(
    applyMiddleware(thunk),
    devtools,
  );

  return createStore(
    combinedReducers,
    initialState,
    enhancers,
  );
}

// Create new store for every server-side request so that data
// isn't shared between connections (which would be bad).
// Reuse store on the client-side.
export default function initRedux(initialState) {
  if (!isClient) {
    return create(initialState);
  }

  if (!reduxStore) {
    reduxStore = create(initialState);
  }

  return reduxStore;
}
