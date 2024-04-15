import React from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import { ReactComponent as ClosetIcon } from '../../image/close.svg';

const modalRoot = document.querySelector('#modal-root');

export const Modal = () => {
  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <ClosetIcon
          className={css.closeIcon}
          width="24"
          height="24"
          onClick={handleBackdropClick}
        />
        <p>Modal</p>
      </div>
    </div>,
    modalRoot
  );
};
