import React, { useEffect, ReactNode, FC } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalsContainer = document.querySelector('#modals') as HTMLElement;

type TModal = {
  closeAllModals: () => void;
  onOverlayClick: () => void;
  children: ReactNode;
};

const Modal: FC<TModal> = ({ closeAllModals, children }) => {
  // При монтировании компонента (открытии модалки) навешиваем на document обработчик Esc
  // При демонтаже компонента (закрытии модалки) удаляем обработчик
  useEffect(() => {
    const onEscKeydown = (e: KeyboardEvent) => {
      e.key === 'Escape' && closeAllModals();
    };

    document.addEventListener('keydown', onEscKeydown);

    return () => {
      document.removeEventListener('keydown', onEscKeydown);
    };
  }, [closeAllModals]);

  return ReactDOM.createPortal(
    <>
      <section className={`${styles.modal}`}>
        <div className={`${styles.container}`}>
          <button
            className={styles.close_btn}
            onClick={closeAllModals}
          >
            <CloseIcon type={'primary'} />
          </button>
          {children}
        </div>
      </section>
      <ModalOverlay onClick={closeAllModals} />
    </>,
    modalsContainer
  );
};

export default Modal;
