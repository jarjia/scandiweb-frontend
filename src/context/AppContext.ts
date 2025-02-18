import { createContext } from "react";
import { Product } from "../types/types";

export const AppContext = createContext<{
  cart: Product[];
  cartItemLength: number;
  handleUpdateQuantity: (id: string, quantity: number) => void;
  handleUpdateAttribute: (id: number, chosen: string | number) => void;
  handleAddCartItem: (cartData: Product) => void;
  handlePlaceOrder: () => void;
}>({
  cart: [],
  cartItemLength: 0,
  handleAddCartItem: () => {},
  handlePlaceOrder: () => {},
  handleUpdateQuantity: () => {},
  handleUpdateAttribute: () => {},
});
