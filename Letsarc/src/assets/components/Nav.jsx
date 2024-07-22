import React from 'react';
import Logo from './images/l.png';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-2 bg-secondary shadow-md">
      <div className="flex items-center">
        <img src={Logo} alt="Logo" className="h-20 mr-2 pl-9" />
      </div>
    </div>
  );
};

export default Navbar;
