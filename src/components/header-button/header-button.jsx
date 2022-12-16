import React from 'react';
import buttonStyles from './header-button.module.css';
import PropTypes from 'prop-types';
import { useLocation, NavLink as Link } from 'react-router-dom';

const HeaderButton = ({ icon: Icon, text, to, exact }) => {
  const location = useLocation();

  return (
    <div>
      <Link
        to={to}
        className={`${buttonStyles.button} text text_type_main-default text_color_inactive pl-5 pr-5 pb-4 pt-4`}
        activeClassName={`${buttonStyles.button_type_active}`}
        exact={exact}
      >
        <Icon type={location.pathname === to ? 'primary' : 'secondary'} />
        {text}
      </Link>
    </div>
  );
};

HeaderButton.propTypes = {
  icon: PropTypes.any,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

export default HeaderButton;
