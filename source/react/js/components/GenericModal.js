import React from 'react';
import ReactModal from 'react-modal';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import ModalLayout from './opportunity_standard/layouts/ModalLayout';

const defaultModalStyle = {
  overlay: {
    zIndex: 10001, // 10001, because header was set to 10000
    backgroundColor: 'rgb(7, 31, 66, 0.8)'
  },
  content: {
    inset: 0,
    top: '0px',
    left: '0px',
    bottom: '0px',
    border: 'none',
    background: 'none',
    padding: 0,
    maxWidth: '390px'
  }
}

const disableBackScroll = () => {
  document.body.style.top = `-${window.scrollY}px`
  document.body.style.position = 'fixed'
}

const enableBackScroll = () => {
  const scrollY = document.body.style.top
  document.body.style.position = ''
  document.body.style.top = ''
  window.scrollTo({ left: 0, top: parseInt(scrollY || '0') * -1, behavior: 'instant' })
}

const GenericModal = ({ isOpen, onRequestClose, headerLabel, content, footer }) => {
  return (
    <>
      <style>
      {`
        .ReactModal__Overlay {
          transition: all .5s;
          opacity: 0;
        }
        .ReactModal__Overlay--after-open{
          opacity: 1;
        }
        .ReactModal__Overlay--before-close{
          opacity: 0;
        }
        .ReactModal__Content {
          transition: all .5s;
          opacity: 0;
          transform: translateX(-390px);
        }

        .ReactModal__Content--after-open{
          opacity: 1;
          transform: translateX(0);
        }

        .ReactModal__Content--before-close{
          opacity: 0;
          transform: translateX(-390px);
        }
      `}
      </style>

      <ReactModal
        onAfterOpen={disableBackScroll}
        onAfterClose={enableBackScroll}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={defaultModalStyle}
        appElement={document.getElementById('main-layout')}
        closeTimeoutMS={500}
      >
        <ModalLayout
          headerLabel={headerLabel}
          content={content}
          footer={footer}
          onCloseButtonClick={onRequestClose}
        />
      </ReactModal>
    </>
  )
}

export default GenericModal;