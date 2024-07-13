import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getComponentDisplayName } from '../utils/misc';

export default () => (ComposedComponent) => {
  const WithIntl = props => (
    <ComposedComponent {...props} />
  );

  WithIntl.displayName = `withIntl(${getComponentDisplayName(ComposedComponent)})`;

  WithIntl.propTypes = {
    intl: PropTypes.shape({
      locale: PropTypes.string.isRequired,
      isRtl: PropTypes.bool.isRequired,
    }).isRequired,
  };

  const mapState = ({ intl }) => ({ intl });

  return connect(mapState)(WithIntl);
};
