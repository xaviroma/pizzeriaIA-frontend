import React, { useEffect } from "react";
import "../styles/Footer.css"; // Estilo del Footer

const Footer: React.FC = () => {
  useEffect(() => {
    console.log("[PizzeriaIA] Footer montado");
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; 2025 Pizza & Burger JM. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
