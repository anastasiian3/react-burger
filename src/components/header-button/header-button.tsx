import React, { FC } from 'react';
import buttonStyles from './header-button.module.css';
import { NavLink as Link } from 'react-router-dom';

interface IHeaderButton extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  to: string;
  exact?: boolean;
}

const HeaderButton: FC<IHeaderButton> = ({ text, to, exact, ...props }) => {
  return (
    <div>
      <Link
        to={to}
        className={`${buttonStyles.button} text text_type_main-default text_color_inactive pl-5 pr-5 pb-4 pt-4`}
        activeClassName={`${buttonStyles.button_type_active}`}
        exact={exact}
      >
        {props.children}
        {text}
      </Link>
    </div>
  );
};

export default HeaderButton;
