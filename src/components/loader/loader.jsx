import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './loader.module.css';

function Loader() {
  const location = useLocation();

  const isUserHistory = location?.pathname.includes('/profile/orders')
    ? `${styles.container_type_user}`
    : `${styles.container_type_usual}`;

  return (
    <div className={`${styles.container} ${isUserHistory}`}>
      <div className={styles.lds_ellipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
