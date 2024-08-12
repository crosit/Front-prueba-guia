import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/products">Protucts</Link></li>
          <li><Link to="/shopping-cart">Shopping Cart</Link></li>
          <li><Link to="/credit-card">Credit Cards</Link></li>
          <li><Link to="/shopps">Shoppings</Link></li>
          <li className='logoutButton'><Link to="/" onClick={logout}>Logout</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
