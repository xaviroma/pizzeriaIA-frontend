import React, { useEffect } from "react";
import { CartItem } from "./types";
import "../styles/OrderDetail.css";
import { Link } from "react-router-dom";

interface OrderDetailProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: number, size: CartItem["tamañoSeleccionado"], quantity: number) => void;
  onRemoveFromCart: (productId: number, size: CartItem["tamañoSeleccionado"]) => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveFromCart
}) => {
  useEffect(() => {
    console.log("[PizzeriaIA] OrderDetail montado, items en carrito:", cart.length, cart);
  }, [cart]);

  const total = cart.reduce((acc, product) => {
    const price =
      product.tamañoSeleccionado === "Pequena"
        ? product.precioPequena
        : product.tamañoSeleccionado === "Mediana"
        ? product.precioMediana
        : product.precioFamiliar;

    return acc + price * product.quantity;
  }, 0);

  console.log("[PizzeriaIA] OrderDetail total:", total);

  return (
    <div className="order-detail">
      <h2>Detalles del Pedido</h2>

      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          <ul>
            {cart.map((product) => (
              <li key={`${product.id}-${product.tamañoSeleccionado}`} className="order-item">
                <img
                  src={
                    product.imagen
                      ? `/images/${product.imagen}`
                      : "/images/imagen_no_disponible.jpg"
                  }
                  alt={product.nombre}
                />

                <div>
                  <h3>
                    {product.nombre} - {product.tamañoSeleccionado}
                  </h3>

                  <p>
                    {product.quantity} x $
                    {product.tamañoSeleccionado === "Pequena"
                      ? product.precioPequena
                      : product.tamañoSeleccionado === "Mediana"
                      ? product.precioMediana
                      : product.precioFamiliar}
                  </p>

                  <div className="order-item-actions">
                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          onUpdateQuantity(
                            product.id,
                            product.tamañoSeleccionado,
                            product.quantity - 1
                          )
                        }
                        disabled={product.quantity === 1}
                      >
                        -
                      </button>

                      <span>{product.quantity}</span>

                      <button
                        onClick={() =>
                          onUpdateQuantity(
                            product.id,
                            product.tamañoSeleccionado,
                            product.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        onRemoveFromCart(product.id, product.tamañoSeleccionado)
                      }
                      className="remove-btn"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
      )}

      <Link to="/">Volver al Menú</Link>
    </div>
  );
};

export default OrderDetail;