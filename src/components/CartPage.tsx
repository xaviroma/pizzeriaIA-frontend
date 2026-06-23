// components/CartPage.tsx
import React from "react";
import { ProductType } from "./types";

interface CartPageProps {
  cart: ProductType[];
  onRemoveFromCart: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cart, onRemoveFromCart, onUpdateQuantity }) => {
  return (
    <div>
      <h3>Carrito</h3>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        cart.map((product) => (
          <div key={product.id}>
            <h4>{product.nombre}</h4>
            <p>Precio: {product.precioPequena}€</p>
            <button onClick={() => onRemoveFromCart(product.id)}>Eliminar</button>
            <input
              type="number"
              onChange={(e) => onUpdateQuantity(product.id, Number(e.target.value))}
              min="1"
            />
          </div>
        ))
      )}
    </div>
  );
};

export default CartPage;
