import React, { useEffect } from "react";
import "../styles/Footer.css";

const Footer: React.FC = () => {
  useEffect(() => {
    console.log("[PizzeriaIA] Footer mounted");
  }, []);

  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>🍕 Pizza & Burger JM</p>
        <span>© 2026 Todos los derechos reservados</span>
      </div>
    </footer>
  );
};

export default Footer;