import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>✅ Pago realizado correctamente</h1>
      <p>Tu pedido ha sido recibido y está siendo procesado.</p>

      <Link to="/">
        Volver al menú
      </Link>
    </div>
  );
};

export default PaymentSuccess;