import React from 'react';
import buttonStyles from './header-button.module.css';

const HeaderButton = ({ icon, text }) => {
  return (
    <div>
      <a
        className={`${buttonStyles.button} text text_type_main-default pl-5 pr-5 pb-4 pt-4`}
        href='#'
      >
        {icon}
        {text}
      </a>
    </div>
  );
};

export default HeaderButton;
