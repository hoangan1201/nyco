import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import layout from '../../../styles/with-layout.scss';
import style from '../../../styles/components/opportunity_standard/layouts/modal-layout.scss';
import CloseIcon from '../icons/Close';

const ModalLayout = ({ headerLabel, content, footer, onCloseButtonClick }) => {
  return (
    <div className={layout.rootNew}>
      <div className={style.modalLayout}>
        <div className={style.head}>
          <h4>{ headerLabel }</h4>

          <div className={style.closeIcon}>
            <CloseIcon size={24} onClick={onCloseButtonClick} style={{ cursor: 'pointer' }} />
          </div>
        </div>

        <div className={style.content}>
          { content }
        </div>
        
        <div className={style.footer}>
          { footer }
        </div>
      </div>
    </div>
  )
}

ModalLayout.propTypes = {
  headerLabel: PropTypes.string,
  content: PropTypes.node,
  footer: PropTypes.node,
  onCloseButtonClick: PropTypes.func
}

ModalLayout.defaultProps = {
  onCloseButtonClick: () => {}
}

export default withStyles(style)(ModalLayout);