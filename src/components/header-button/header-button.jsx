import React from 'react';
import buttonStyles from './header-button.module.css';
import PropTypes from 'prop-types';

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

HeaderButton.propTypes = {
  icon: PropTypes.any,
  text: PropTypes.string.isRequired,
};

export default HeaderButton;
