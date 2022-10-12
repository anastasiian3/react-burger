import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modalsContainer = document.querySelector('#modals');

const Modal = ({ onOverlayClick, closeAllModals, children }) => {
  // При монтировании компонента (открытии модалки) навешиваем на document обработчик Esc
  // При демонтаже компонента (закрытии модалки) удаляем обработчик
  useEffect(() => {
    const onEscKeydown = (e) => {
      e.key === 'Escape' && closeAllModals();
    };

    document.addEventListener('keydown', onEscKeydown);

    return () => {
      document.removeEventListener('keydown', onEscKeydown);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={`${styles.modal}`}>
        <section className={`${styles.container}`}>{children}</section>
      </div>
      <ModalOverlay onClick={onOverlayClick} />
    </>,
    modalsContainer
  );
};

export default Modal;
