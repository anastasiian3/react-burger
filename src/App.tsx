import React, { useEffect, useState } from 'react';
import './App.css';
import { url } from './utils/const';

import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';

function App() {
  const [ingredients, setIngredients] = useState([]);

  const receiveIngredientsData = () => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => setIngredients(json.data))
      .catch((err) => {
        console.log(err);
        alert('Ошибка при получении данных');
      });
  };

  useEffect(() => {
    receiveIngredientsData();
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
