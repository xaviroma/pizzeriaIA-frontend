import React, { useState } from "react";
import { ProductType, CartItem } from "./types";
import "../styles/ProductList.css";

interface ProductListProps {
  products: ProductType[];
  onAddToCart: (items: CartItem[]) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  const [quantities, setQuantities] = useState<{
    [productId: number]: { [size: string]: number };
  }>({});

  const isValidPrice = (value: any) =>
    value !== null && value !== undefined && value !== "" && Number(value) > 0;

  const handleAddToCart = (product: ProductType) => {
    const productEntries = Object.entries(quantities[product.id] || {});

    if (productEntries.length === 0) return;

    const itemsToAdd: CartItem[] = productEntries.map(([size, quantity]) => ({
      ...product,
      tamañoSeleccionado: size as "Pequena" | "Mediana" | "Familiar",
      quantity,
    }));

    onAddToCart(itemsToAdd);
  };

  return (
    <div className="product-list">
      {products.map((product) => {
        const hasSizes =
          isValidPrice(product.precioPequena) &&
          isValidPrice(product.precioMediana) &&
          isValidPrice(product.precioFamiliar);

        const handleChange = (
          size: "Pequena" | "Mediana" | "Familiar",
          delta: number
        ) => {
          setQuantities((prev) => ({
            ...prev,
            [product.id]: {
              ...prev[product.id],
              [size]: Math.max(0, (prev[product.id]?.[size] || 0) + delta),
            },
          }));
        };

        const singlePrice =
          isValidPrice(product.precioPequena)
            ? product.precioPequena
            : isValidPrice(product.precioMediana)
            ? product.precioMediana
            : product.precioFamiliar;

        return (
          <div key={product.id} className="product-item">
            <img
              src={
                product.imagen
                  ? `/images/${product.imagen}`
                  : "/images/imagen_no_disponible.jpg"
              }
              alt={product.nombre}
            />

            <h3>{product.nombre}</h3>

            <p>{product.descripcion}</p>

            <div className="size-selection">
              {hasSizes ? (
                (["Pequena", "Mediana", "Familiar"] as const).map((size) => (
                  <div key={size} className="size-row">
                    <div className="size-info">
                      <span className="size-name">{size}</span>
                      <span className="size-price">
                        {product[`precio${size}` as keyof ProductType] as number} €
                      </span>
                    </div>

                    <div className="product-quantity">
                      <button type="button" onClick={() => handleChange(size, -1)}>
                        -
                      </button>

                      <span className="quantity">
                        {quantities[product.id]?.[size] || 0}
                      </span>

                      <button type="button" onClick={() => handleChange(size, 1)}>
                        +
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="size-row">
                  <div className="size-info">
                    <span className="size-name">Normal</span>
                    <span className="size-price">{product.precioPequena} €</span>
                  </div>

                  <div className="product-quantity">
                    <button type="button" onClick={() => handleChange("Pequena", -1)}>
                      -
                    </button>

                    <span className="quantity">
                      {quantities[product.id]?.Pequena || 0}
                    </span>

                    <button type="button" onClick={() => handleChange("Pequena", 1)}>
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
              Añadir al carrito
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;