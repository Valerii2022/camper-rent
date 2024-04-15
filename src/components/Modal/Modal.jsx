import React from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import { ReactComponent as ClosetIcon } from '../../image/close.svg';

const modalRoot = document.querySelector('#modal-root');

export const Modal = () => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        modalIsOpen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalIsOpen]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      modalIsOpen(false);
    }
  };

  // const convertMileage = mileage => {
  //   if (mileage >= 1000) {
  //     const res = mileage.toString().split('');
  //     res.splice(res.length - 3, 0, ',').join('');
  //     return res;
  //   } else {
  //     return mileage;
  //   }
  // };

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
