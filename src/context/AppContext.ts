import { createContext } from "react";
import { Product, SetState } from "../types/types";

export const AppContext = createContext<{
  cart: Product[];
  cartOverlay: boolean;
  cartItemLength: number;
  handleUpdateQuantity: (id: string, quantity: number) => void;
  handleUpdateAttribute: (id: number, chosen: string | number) => void;
  handleAddCartItem: (cartData: Product) => void;
  handlePlaceOrder: () => void;
  setCartOverlay: SetState<boolean>;
}>({
  cart: [],
  cartOverlay: false,
  cartItemLength: 0,
  handleAddCartItem: () => {},
  handlePlaceOrder: () => {},
  handleUpdateQuantity: () => {},
  handleUpdateAttribute: () => {},
  setCartOverlay: () => {},
});
