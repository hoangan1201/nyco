import { compose } from 'redux';

import withRedux from './withRedux';
import withLayout from './withLayout';
import withIntl from './withIntl';

export default (params) => {
  const {
    isDark = false,
  } = params || {};

  return compose(
    withRedux,
    withIntl(),
    withLayout({ isDark }),
  );
};
