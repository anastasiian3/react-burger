import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const modalsContainer = document.querySelector('#modals');

const Modal = ({ closeAllModals, children }) => {
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

Modal.propTypes = {
  closeAllModals: PropTypes.func.isRequired,
  children: PropTypes.any,
};

export default Modal;
