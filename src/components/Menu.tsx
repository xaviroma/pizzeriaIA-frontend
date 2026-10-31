import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Menu.css";

const Menu: React.FC = () => {
  useEffect(() => {
  }, []);

  return (
    <div className="menu-page">
      <h2 className="menu-title">¿Qué te apetece hoy?</h2>

      <div className="menu-grid">

        {/* ENTRANTES */}
        <Link to="/Entrantes" className="menu-card">
          <img
            src="https://images.unsplash.com/photo-1606755456206-b25206cde27e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Entrantes"
          />
          <div className="menu-overlay" />
          <h3>Entrantes</h3>
        </Link>

        {/* MENÚS */}
        <Link to="/Menus" className="menu-card">
          <img
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop"
            alt="Menús"
          />
          <div className="menu-overlay" />
          <h3>Menús</h3>
        </Link>

        {/* PIZZAS */}
        <Link to="/pizzas" className="menu-card">
          <img
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Pizzas"
          />
          <div className="menu-overlay" />
          <h3>Pizzas</h3>
        </Link>

        {/* HAMBURGUESAS */}
        <Link to="/hamburguesas" className="menu-card">
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop"
            alt="Hamburguesas"
          />
          <div className="menu-overlay" />
          <h3>Hamburguesas</h3>
        </Link>

        {/* BOCATAS */}
        <Link to="/Bocatas" className="menu-card">
          <img
            src="https://images.unsplash.com/photo-1655279562015-047c3da9a271?q=80&w=766&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Bocatas"
          />
          <div className="menu-overlay" />
          <h3>Bocatas</h3>
        </Link>

        {/* SANDWICHES */}
        <Link to="/Sandwiches" className="menu-card">
          <img
            src="https://plus.unsplash.com/premium_photo-1738802845911-809a01acfa50?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Sandwiches"
          />
          <div className="menu-overlay" />
          <h3>Sándwiches</h3>
        </Link>

        {/* ENSALADAS */}
        <Link to="/Ensaladas" className="menu-card">
          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop"
            alt="Ensaladas"
          />
          <div className="menu-overlay" />
          <h3>Ensaladas</h3>
        </Link>

        {/* BEBIDAS */}
        <Link to="/Bebidas" className="menu-card">
          <img
            src="https://plus.unsplash.com/premium_photo-1725075086083-89117890371d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Bebidas"
          />
          <div className="menu-overlay" />
          <h3>Bebidas</h3>
        </Link>

      </div>
    </div>
  );
};

export default Menu;