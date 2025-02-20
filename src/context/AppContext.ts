import { createContext } from "react";
import { ContextBody } from "../types/types";

export const AppContext = createContext<ContextBody>({
  cart: [],
  cartOverlay: false,
  cartItemLength: 0,
  handleAddCartItem: () => {},
  handlePlaceOrder: () => {},
  handleUpdateQuantity: () => {},
  handleUpdateAttribute: () => {},
  setCartOverlay: () => {},
});
