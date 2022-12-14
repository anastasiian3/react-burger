import React from 'react';
import styles from './loader.module.css';

function Loader() {
  return (
    <div className={styles.container}>
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
