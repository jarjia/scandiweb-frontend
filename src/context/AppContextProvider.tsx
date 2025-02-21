import React, { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { Product } from "../types/types";
import { CART_LOCAL_STORAGE_ID } from "../helpers/consts";

const AppContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const saved = JSON.parse(localStorage.getItem(CART_LOCAL_STORAGE_ID) || "[]");
  const [cart, setCart] = useState<Product[]>(saved);
  const [cartOverlay, setCartOverlay] = useState(false);

  useEffect(() => {
    const debounce = setTimeout(() => {
      localStorage.setItem(CART_LOCAL_STORAGE_ID, JSON.stringify(cart));
    }, 100);

    return () => clearTimeout(debounce);
  }, [cart]);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.key === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleUpdateAttribute = (id: number, chosen: string | number) => {
    setCart((prev) =>
      prev.map((item) => ({
        ...item,
        attributes: item.attributes?.map((attr) =>
          attr.id === id ? { ...attr, chosen } : attr
        ),
      }))
    );
  };

  const handleAddCartItem = (cartItem: Product) => {
    if (!cartItem.inStock) return;
    setCart((prevCart) => {
      const attrChosen = cartItem.attributes?.map((attr) => attr.chosen) || [];

      const existingProduct = prevCart.find((item) => {
        if (item.key !== cartItem.key) return false;

        const itemAttrs = item.attributes?.map((attr) => attr.chosen) || [];
        return (
          itemAttrs.length === attrChosen.length &&
          itemAttrs.every((attr) => attrChosen.includes(attr))
        );
      });

      if (existingProduct) {
        return prevCart.map((item) =>
          item === existingProduct
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [{ ...cartItem, quantity: 1 }, ...prevCart];
    });
  };

  const handlePlaceOrder = () => {
    setCart([]);
    localStorage.removeItem(CART_LOCAL_STORAGE_ID);
    alert("Order placed!");
  };

  const contextValue = {
    cart,
    cartOverlay,
    cartItemLength: cart.reduce((total, item) => total + item.quantity, 0),
    handleAddCartItem,
    handleUpdateQuantity,
    handleUpdateAttribute,
    handlePlaceOrder,
    setCartOverlay,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
