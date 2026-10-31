import api from "./axiosConfig";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import ProductList from "./components/ProductList";
import OrderDetail from "./components/OrderDetail";
import Carousel from "./components/Carousel";

import PaymentSuccess from "./components/PaymentSuccess";
import PaymentCancel from "./components/PaymentCancel";

import "./App.css";

import { ProductType, CartItem } from "./components/types";

const RouteLogger: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
  }, [location.pathname]);

  return null;
};

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);


  useEffect(() => {
  }, []);

  useEffect(() => {
  }, [products]);

  useEffect(() => {
  }, [cart]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/productos");
        setProducts(response.data);
      } catch (error) {
        console.error("[PizzeriaIA] Error al obtener los productos", error);
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
          p.tamanoSeleccionado === item.tamanoSeleccionado
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
    size: CartItem["tamanoSeleccionado"],
    quantity: number
  ) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId &&
        product.tamanoSeleccionado === size
          ? { ...product, quantity }
          : product
      )
    );
  };

  const removeFromCart = (
    productId: number,
    size: CartItem["tamanoSeleccionado"]
  ) => {
    setCart((prevCart) =>
      prevCart.filter(
        (product) =>
          !(
            product.id === productId &&
            product.tamanoSeleccionado === size
          )
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const logCategoryProducts = (category: string) => {
    const filtered = products.filter((p) => p.categoria?.nombre === category);
    return filtered;
  };

  return (
    <Router>
      <RouteLogger />
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
                  category="Entrantes"
                  products={logCategoryProducts("Entrantes")}
                  onAddToCart={addToCart}
                />
              }
            />

            <Route
              path="/menus"
              element={
                <ProductList
                  category="Menus"
                  products={logCategoryProducts("Menus")}
                  onAddToCart={addToCart}
                />
              }
            />

            <Route
              path="/pizzas"
              element={
                <ProductList
                  category="Pizzas"
                  products={logCategoryProducts("Pizzas")}
                  onAddToCart={addToCart}
                />
              }
            />

            <Route
              path="/hamburguesas"
              element={
                <ProductList
                  category="Hamburguesas"
                  products={logCategoryProducts("Hamburguesas")}
                  onAddToCart={addToCart}
                />
              }
            />

            <Route
              path="/bocatas"
              element={
                <ProductList
                  category="Bocatas"
                  products={logCategoryProducts("Bocatas")}
                  onAddToCart={addToCart}
                />
              }
            />

            <Route
              path="/sandwiches"
              element={
                <ProductList
                  category="Sandwiches"
                  products={logCategoryProducts("Sandwiches")}
                  onAddToCart={addToCart}
                />
              }
            />

            <Route
              path="/ensaladas"
              element={
                <ProductList
                  category="Ensaladas"
                  products={logCategoryProducts("Ensaladas")}
                  onAddToCart={addToCart}
                />
              }
            />

            <Route
              path="/bebidas"
              element={
                <ProductList
                  category="Bebidas"
                  products={logCategoryProducts("Bebidas")}
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
                  onClearCart={handleClearCart}
                />
              }
            />
            <Route
              path="/success"
              element={<PaymentSuccess />}
            />

            <Route
              path="/cancel"
              element={<PaymentCancel />}
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;