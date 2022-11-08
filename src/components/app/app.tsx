import React from 'react';
import styles from './app.module.css';
import { Provider } from 'react-redux';
import { store } from '../../services';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <AppHeader />
        <DndProvider backend={HTML5Backend}>
          <main className={styles.main}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        </DndProvider>
      </div>
    </Provider>
  );
}

export default App;
