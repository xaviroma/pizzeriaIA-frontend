import React from "react";
import { CartItem } from "./types";
import "../styles/Cart.css";

interface CartProps {
  cart: CartItem[];
  onRemoveFromCart: (productId: number, size: CartItem["tamañoSeleccionado"]) => void;
  onUpdateQuantity: (productId: number, size: CartItem["tamañoSeleccionado"], quantity: number) => void;
}

const Cart: React.FC<CartProps> = ({
  cart,
  onRemoveFromCart,
  onUpdateQuantity
}) => {
  console.log("CART FULL:", cart);

  const total = cart.reduce((acc, product) => {
    const price =
      product.tamañoSeleccionado === "Pequena"
        ? product.precioPequena
        : product.tamañoSeleccionado === "Mediana"
        ? product.precioMediana
        : product.precioFamiliar;

    return acc + price * product.quantity;
  }, 0);

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>

      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          <ul>
            {cart.map((product) => (
              <li key={`${product.id}-${product.tamañoSeleccionado}`} className="cart-item">
                <div className="cart-item-info">
                  <img
                    src={
                      product.imagen
                        ? `/images/${product.imagen}`
                        : "/images/imagen_no_disponible.jpg"
                    }
                    alt={product.nombre}
                  />

                  <div className="cart-item-details">
                    <h3>
                      {product.nombre} - {product.tamañoSeleccionado}
                    </h3>

                    <p>
                      $
                      {product.tamañoSeleccionado === "Pequena"
                        ? product.precioPequena
                        : product.tamañoSeleccionado === "Mediana"
                        ? product.precioMediana
                        : product.precioFamiliar}{" "}
                      x {product.quantity}
                    </p>
                  </div>
                </div>

                <div className="cart-item-actions">
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
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <h3>Total: ${total.toFixed(2)}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;