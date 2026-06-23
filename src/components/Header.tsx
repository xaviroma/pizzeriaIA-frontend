import React from "react";
import "../styles/Header.css"; // Estilo del Header
import { Link } from "react-router-dom";

interface HeaderProps {
  cartItemCount: number; // Recibe el número de productos en el carrito
}

const Header: React.FC<HeaderProps> = ({ cartItemCount }) => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-link">
          <img 
            src="https://oidokocina.com/pics/462/pizza-burger-jm-comida-domicilio.jpg" 
            alt="Pizza & Burguer JM Logo" 
          />
        </Link>
        <Link to="/" className="logo-link"> {/* Link con clase logo-link */}
          <h1>Pizza & Burguer JM</h1>
        </Link>
        <nav className="nav-bar">
          <Link to="/" className="nav-item">Inicio</Link>
          <Link to="/Entrantes" className="nav-item">Entrantes</Link>
          <Link to="/Menus" className="nav-item">Menús</Link>
          <Link to="/Pizzas" className="nav-item">Pizzas</Link>
          <Link to="/Hamburguesas" className="nav-item">Hamburguesas</Link>
          <Link to="/Bocatas" className="nav-item">Bocatas</Link>
          <Link to="/Sandwiches" className="nav-item">Sándwiches</Link>
          <Link to="/Ensaladas" className="nav-item">Ensaladas</Link>
          <Link to="/Bebidas" className="nav-item">Bebidas</Link>
          <Link to="/Carrito" className="cart-link">
            🛒 {cartItemCount > 0 && <span>{cartItemCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
