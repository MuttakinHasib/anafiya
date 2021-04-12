import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavLink = ({
  to,
  className,
  activeClassName,
  inactiveClassName,
  ...rest
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const allClassNames =
    className + (isActive ? ` ${activeClassName}` : ` ${inactiveClassName}`);
  return <Link className={allClassNames} {...{ to }} {...rest} />;
};

export default NavLink;
