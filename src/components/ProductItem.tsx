import React, { useState } from "react";
import "../styles/ProductItem.css";
import { ProductType, CartItem } from "./types";

interface ProductItemProps {
  product: ProductType;
  onAddToCart: (items: CartItem[]) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onAddToCart }) => {
  const [quantities, setQuantities] = useState<{
    Pequena: number;
    Mediana: number;
    Familiar: number;
  }>({
    Pequena: 0,
    Mediana: 0,
    Familiar: 0,
  });

  const hasSizes =
    product.precioPequena > 0 ||
    product.precioMediana > 0 ||
    product.precioFamiliar > 0;

  const handleChange = (
    size: "Pequena" | "Mediana" | "Familiar",
    delta: number
  ) => {
    setQuantities((prev) => ({
      ...prev,
      [size]: Math.max(0, prev[size] + delta),
    }));
  };

  const handleAdd = () => {
    const items: CartItem[] = hasSizes
      ? (Object.keys(quantities) as Array<
          "Pequena" | "Mediana" | "Familiar"
        >)
          .filter((size) => quantities[size] > 0)
          .map((size) => ({
            ...product,
            tamañoSeleccionado: size,
            quantity: quantities[size],
          }))
      : quantities.Pequena > 0
      ? [
          {
            ...product,
            tamañoSeleccionado: "Pequena",
            quantity: quantities.Pequena,
          },
        ]
      : [];

    if (items.length === 0) return;

    onAddToCart(items);
  };

  return (
    <div className="product-item">
      <img
        src={
          product.imagen
            ? `/images/${product.imagen}`
            : "/images/imagen_no_disponible.jpg"
        }
        alt={product.nombre}
      />

      <h3>{product.nombre}</h3>

      <p>
        Precio:{" "}
        {product.precioPequena > 0
          ? product.precioPequena
          : product.precioMediana > 0
          ? product.precioMediana
          : product.precioFamiliar}{" "}
        €
      </p>

      {hasSizes && (
        <div className="controls">
          {(["Pequena", "Mediana", "Familiar"] as const).map((size) => (
            <div key={size}>
              <button onClick={() => handleChange(size, -1)}>-</button>
              <span>{quantities[size]}</span>
              <button onClick={() => handleChange(size, 1)}>+</button>
            </div>
          ))}
        </div>
      )}

      {!hasSizes && (
        <div className="controls">
          <button onClick={() => handleChange("Pequena", 1)}>+</button>
          <span>{quantities.Pequena}</span>
        </div>
      )}

      <button onClick={handleAdd}>Añadir al carrito</button>
    </div>
  );
};

export default ProductItem;