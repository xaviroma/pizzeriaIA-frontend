import React, { useEffect, useState } from "react";
import { ProductType, CartItem } from "./types";
import "../styles/ProductList.css";

interface ProductListProps {
  category?: string;
  products: ProductType[];
  onAddToCart: (items: CartItem[]) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  category,
  products,
  onAddToCart,
}) => {
  const [quantities, setQuantities] = useState<{
    [productId: number]: { [size: string]: number };
  }>({});

  useEffect(() => {
    console.log("[PizzeriaIA] ProductList:", category, products.length);
  }, [category, products]);

  const isValidPrice = (value: any) =>
    value !== null && value !== undefined && value !== "" && Number(value) > 0;

  const handleAddToCart = (product: ProductType) => {
    const productEntries = Object.entries(
      quantities[product.id] || {}
    ).filter(([, quantity]) => quantity > 0);

    if (productEntries.length === 0) return;

    const itemsToAdd: CartItem[] = productEntries.map(([size, quantity]) => ({
      ...product,
      tamanoSeleccionado: size as "Pequena" | "Mediana" | "Familiar",
      quantity,
    }));

    onAddToCart(itemsToAdd);

    setQuantities((prev) => ({
      ...prev,
      [product.id]: {},
    }));
  };

  return (
    <div className="product-grid">
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
              [size]: Math.max(
                0,
                (prev[product.id]?.[size] || 0) + delta
              ),
            },
          }));
        };

        const totalSelected = Object.values(
          quantities[product.id] || {}
        ).reduce((a, b) => a + b, 0);

        return (
          <div key={product.id} className="product-card">

            {/* IMAGE */}
            <div className="product-image">
              <img
                src={
                  product.imagen
                    ? `/images/${product.imagen}`
                    : "/images/imagen_no_disponible.jpg"
                }
                alt={product.nombre}
              />
              <div className="image-overlay" />
            </div>

            {/* CONTENT */}
            <div className="product-content">
              <h3>{product.nombre}</h3>

              <p className="description">{product.descripcion}</p>

              <div className="sizes">
                {hasSizes ? (
                  (["Pequena", "Mediana", "Familiar"] as const).map(
                    (size) => (
                      <div key={size} className="size-row">
                        <div className="size-info">
                          <span>{size}</span>
                          <strong>
                            {
                              product[
                                `precio${size}` as keyof ProductType
                              ] as number
                            }{" "}
                            €
                          </strong>
                        </div>

                        <div className="qty">
                          <button onClick={() => handleChange(size, -1)}>
                            −
                          </button>

                          <span>
                            {quantities[product.id]?.[size] || 0}
                          </span>

                          <button onClick={() => handleChange(size, 1)}>
                            +
                          </button>
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <div className="size-row">
                    <div className="size-info">
                      <span>Normal</span>
                      <strong>{product.precioPequena} €</strong>
                    </div>

                    <div className="qty">
                      <button onClick={() => handleChange("Pequena", -1)}>
                        −
                      </button>

                      <span>
                        {quantities[product.id]?.Pequena || 0}
                      </span>

                      <button onClick={() => handleChange("Pequena", 1)}>
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                className="add-btn"
                onClick={() => handleAddToCart(product)}
                disabled={totalSelected === 0}
              >
                Añadir al carrito
                {totalSelected > 0 && ` (${totalSelected})`}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;