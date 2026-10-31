import React, { useEffect, useState } from "react";
import "../styles/Header.css";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  cartItemCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
  }, [location.pathname, cartItemCount]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header className="header">
        <div className="header-inner">

          <Link to="/" className="brand">
            <img
              src="https://oidokocina.com/pics/462/pizza-burger-jm-comida-domicilio.jpg"
              alt="Pizza & Burguer JM"
            />
            <h1>Pizza & Burguer JM</h1>
          </Link>

          {/* HAMBURGUESA */}
          <button className="hamburger" onClick={() => setOpen(!open)}>
            ☰
          </button>

          {/* NAV DESKTOP */}
          <nav className="nav">
            <Link to="/" className="nav-item">Inicio</Link>
            <Link to="/Entrantes" className="nav-item">Entrantes</Link>
            <Link to="/Menus" className="nav-item">Menús</Link>
            <Link to="/Pizzas" className="nav-item">Pizzas</Link>
            <Link to="/Hamburguesas" className="nav-item">Burgers</Link>
            <Link to="/Bebidas" className="nav-item">Bebidas</Link>

            <Link to="/Carrito" className="cart">
              🛒
              {cartItemCount > 0 && <span>{cartItemCount}</span>}
            </Link>
          </nav>

        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div className={`mobile-overlay ${open ? "open" : ""}`} onClick={closeMenu} />

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${open ? "open" : ""}`}>
         <button className="close-menu" onClick={closeMenu}>
          ✕
        </button>
        <h3 className="mobile-title">Menú</h3>
        <Link to="/" onClick={closeMenu}>Inicio</Link>
        <Link to="/Entrantes" onClick={closeMenu}>Entrantes</Link>
        <Link to="/Menus" onClick={closeMenu}>Menús</Link>
        <Link to="/Pizzas" onClick={closeMenu}>Pizzas</Link>
        <Link to="/Hamburguesas" onClick={closeMenu}>Burgers</Link>
        <Link to="/Bebidas" onClick={closeMenu}>Bebidas</Link>
        <Link to="/Carrito" onClick={closeMenu} className="cart-mobile">
          🛒 Carrito
          {cartItemCount > 0 && <span>{cartItemCount}</span>}
        </Link> 
      </div>
    </>
  );
};

export default Header;