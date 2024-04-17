import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import { useEffect } from 'react';
import { ReactComponent as ClosetIcon } from '../../image/close.svg';

const modalRoot = document.querySelector('#modal-root');

export const BookingSuccessModal = ({ modalIsOpen }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        modalIsOpen();
        document.body.classList.remove('lock');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalIsOpen]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      modalIsOpen();
      document.body.classList.remove('lock');
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <ClosetIcon
          className={css.closeIcon}
          width="24"
          height="24"
          onClick={() => {
            modalIsOpen();
            document.body.classList.remove('lock');
          }}
        />
        <h1>Thank you for booking!</h1>
      </div>
    </div>,
    modalRoot
  );
};
