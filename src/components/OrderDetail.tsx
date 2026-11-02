import React, { useEffect } from "react";
import { CartItem } from "./types";
import "../styles/OrderDetail.css";
import { Link } from "react-router-dom";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const { usuario } = useAuth();
const navigate = useNavigate();

interface OrderDetailProps {
  cart: CartItem[];
  onUpdateQuantity: (
    productId: number,
    size: CartItem["tamanoSeleccionado"],
    quantity: number
  ) => void;
  onRemoveFromCart: (
    productId: number,
    size: CartItem["tamanoSeleccionado"]
  ) => void;
  onClearCart: () => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveFromCart,
  onClearCart,
}) => {
  useEffect(() => {
  }, [cart]);

  const total = cart.reduce((acc, product) => {
    const price =
      product.tamanoSeleccionado === "Pequena"
        ? product.precioPequena
        : product.tamanoSeleccionado === "Mediana"
        ? product.precioMediana
        : product.precioFamiliar;

    return acc + price * product.quantity;
  }, 0);

  const handleCheckout = async () => {
    if (!usuario) {
      navigate("/login", {
        state: {
          message: "Inicia sesión para realizar tu pedido.",
          from: "/carrito"
        }
      });
      return;
    }
    try {
      const pedidoResponse = await api.post("/pedidos", {
        clienteId: 1,
        cart: cart.map((item) => ({
          productoId: item.id,
          tamanoSeleccionado: item.tamanoSeleccionado,
          quantity: item.quantity,
          ingredientesIds: item.ingredientesIds ?? [],
        })),
      });

      const pedidoId = pedidoResponse.data;

      const stripeResponse = await api.post(
        `/payments/create-session?pedidoId=${pedidoId}`
      );

      window.location.href = stripeResponse.data;
    } catch (error) {
      console.error("Error en checkout", error);
    }
  };

  return (
    <div className="order-page">
      <div className="order-container">

        <header className="order-header">
          <h2>Tu pedido</h2>
          <p className="subtitle">Revisa y confirma tus productos</p>
        </header>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">🍕</div>
            <h3>Tu carrito está vacío</h3>
            <p>Añade productos del menú para empezar tu pedido</p>

            <Link to="/" className="action-btn primary">
              Ir al menú
            </Link>
          </div>
        ) : (
          <>
            <ul className="order-list">
              {cart.map((product) => {
                const price =
                  product.tamanoSeleccionado === "Pequena"
                    ? product.precioPequena
                    : product.tamanoSeleccionado === "Mediana"
                    ? product.precioMediana
                    : product.precioFamiliar;

                return (
                  <li
                    key={`${product.id}-${product.tamanoSeleccionado}`}
                    className="order-item"
                  >
                    <div className="item-left">
                      <img
                        src={
                          product.imagen
                            ? `/images/${product.imagen}`
                            : "/images/imagen_no_disponible.jpg"
                        }
                        alt={product.nombre}
                      />

                      <div className="item-info">
                        <h3>{product.nombre}</h3>
                        <span>{product.tamanoSeleccionado}</span>
                        <strong>{price.toFixed(2)} €</strong>
                      </div>
                    </div>

                    <div className="item-right">
                      <div className="quantity-controls">
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              product.id,
                              product.tamanoSeleccionado,
                              product.quantity - 1
                            )
                          }
                          disabled={product.quantity === 1}
                        >
                          −
                        </button>

                        <span>{product.quantity}</span>

                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              product.id,
                              product.tamanoSeleccionado,
                              product.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() =>
                          onRemoveFromCart(
                            product.id,
                            product.tamanoSeleccionado
                          )
                        }
                        className="remove-btn"
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="order-summary">
              <div className="total">
                <span>Total</span>
                <strong>{total.toFixed(2)} €</strong>
              </div>

              <button onClick={handleCheckout} className="checkout-btn">
                Pagar ahora
              </button>
            </div>
          </>
        )}

        <footer className="bottom-actions">
          <Link to="/" className="action-btn">
            Volver
          </Link>

          {cart.length > 0 && (
            <button
              className="action-btn danger"
              onClick={() => {
                if (window.confirm("¿Vaciar carrito?")) onClearCart();
              }}
            >
              Vaciar
            </button>
          )}
        </footer>

      </div>
    </div>
  );
};

export default OrderDetail;