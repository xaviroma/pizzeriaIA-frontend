import React from "react";
import { Link } from "react-router-dom";

const PaymentCancel: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>❌ Pago cancelado</h1>
      <p>No se ha realizado ningún cobro.</p>

      <Link to="/carrito">
        Volver al carrito
      </Link>
    </div>
  );
};

export default PaymentCancel;