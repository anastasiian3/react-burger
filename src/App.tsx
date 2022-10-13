import React, { useEffect, useState } from 'react';
import './App.css';
import { getServerData } from './utils/api';

import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';

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
      <main className='main'>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </main>
    </div>
  );
}

export default App;
