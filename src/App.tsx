import api from "./axiosConfig";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import ProductList from "./components/ProductList";
import OrderDetail from "./components/OrderDetail";
import Carousel from "./components/Carousel";

import "./App.css";

import { ProductType, CartItem } from "./components/types";

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/productos");
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener los productos", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (items: CartItem[]) => {
  setCart((prevCart) => {
    const newCart = [...prevCart];

    items.forEach((item) => {
      const index = newCart.findIndex(
        (p) =>
          p.id === item.id &&
          p.tamañoSeleccionado === item.tamañoSeleccionado
      );

      if (index !== -1) {
        newCart[index] = {
          ...newCart[index],
          quantity: newCart[index].quantity + item.quantity,
        };
      } else {
        newCart.push({ ...item });
      }
    });

    return newCart;
  });
};

  const updateQuantity = (
    productId: number,
    size: CartItem["tamañoSeleccionado"],
    quantity: number
  ) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId &&
        product.tamañoSeleccionado === size
          ? { ...product, quantity }
          : product
      )
    );
  };

  const removeFromCart = (
    productId: number,
    size: CartItem["tamañoSeleccionado"]
  ) => {
    setCart((prevCart) =>
      prevCart.filter(
        (product) =>
          !(
            product.id === productId &&
            product.tamañoSeleccionado === size
          )
      )
    );
  };

  return (
    <Router>
      <div className="App">
        <Header cartItemCount={cart.reduce((total, item) => total + item.quantity, 0)}/>
        <Carousel />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Menu />} />

            <Route
              path="/entrantes"
              element={
                <ProductList
                  products={products.filter(
                    (p) => p.categoria.nombre === "Entrantes"
                  )}
                  onAddToCart={addToCart}
                />
              }
            />

            <Route
              path="/menus"
              element={
                <ProductList
                  products={products.filter(
                    (p) => p.categoria.nombre === "Menus"
                  )}
                  onAddToCart={addToCart}
                />
              }
            />

            <Route
              path="/pizzas"
              element={
                <ProductList
                  products={products.filter(
                    (p) => p.categoria.nombre === "Pizzas"
                  )}
                  onAddToCart={addToCart}
                />
              }
            />

            <Route
              path="/hamburguesas"
              element={
                <ProductList
                  products={products.filter(
                    (p) => p.categoria.nombre === "Hamburguesas"
                  )}
                  onAddToCart={addToCart}
                />
              }
            />

            <Route
              path="/bocatas"
              element={
                <ProductList
                  products={products.filter(
                    (p) => p.categoria.nombre === "Bocatas"
                  )}
                  onAddToCart={addToCart}
                />
              }
            />

            <Route
              path="/sandwiches"
              element={
                <ProductList
                  products={products.filter(
                    (p) => p.categoria.nombre === "Sandwiches"
                  )}
                  onAddToCart={addToCart}
                />
              }
            />

            <Route
              path="/ensaladas"
              element={
                <ProductList
                  products={products.filter(
                    (p) => p.categoria.nombre === "Ensaladas"
                  )}
                  onAddToCart={addToCart}
                />
              }
            />

            <Route
              path="/bebidas"
              element={
                <ProductList
                  products={products.filter(
                    (p) => p.categoria.nombre === "Bebidas"
                  )}
                  onAddToCart={addToCart}
                />
              }
            />

            <Route
              path="/carrito"
              element={
                <OrderDetail
                  cart={cart}
                  onUpdateQuantity={updateQuantity}
                  onRemoveFromCart={removeFromCart}
                />
              }
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;