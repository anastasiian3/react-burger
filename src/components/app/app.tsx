import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import { getServerData } from '../../utils/api';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getServerData()
      .then((json) => setIngredients(json.data))
      .catch((err) => {
        console.log(err);
        alert('Ошибка при получении данных');
      });
  }, []);

  return (
    <div className='App'>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </main>
    </div>
  );
}

export default App;
