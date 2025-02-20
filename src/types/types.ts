import { Dispatch, SetStateAction } from "react";

export type SetState<T> = Dispatch<SetStateAction<T>>;

export type Product = {
  key: string;
  id: string;
  name: string;
  gallery: string;
  inStock: boolean;
  quantity: number;
  price: Price;
  attributes?: Attributes[];
};

export type Price = {
  amount: string;
  currency: Currency;
};

export type Currency = {
  symbol: string;
  label?: string;
};

export type Attributes = {
  id: number;
  type: string;
  name: string;
  chosen: number | string | null;
  items: AttributeItem[];
};

export type Attribute = {
  attr: Attr;
  handleUpdateAttribute?: (id: number, chosen: string | number) => void;
  isProductPage?: boolean;
};

export type Attr = {
  id: number;
  name: string;
  items: AttributeItem[];
  chosen: string | number | null;
};

export type AttributeItem = {
  id?: number;
  value: string | number;
  displayValue: string | number;
};

export type OrderInput = {
  product_id: string;
  quantity: number;
  attributes: {
    name: string;
    chosen: string;
  }[];
};

export type ContextBody = {
  cart: Product[];
  cartOverlay: boolean;
  cartItemLength: number;
  handleUpdateQuantity: (id: string, quantity: number) => void;
  handleUpdateAttribute: (id: number, chosen: string | number) => void;
  handleAddCartItem: (cartData: Product) => void;
  handlePlaceOrder: () => void;
  setCartOverlay: SetState<boolean>;
};
