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
  currency: {
    symbol: string;
    label?: string;
  };
};

export type Attributes = {
  id: number;
  type: string;
  name: string;
  chosen: number | string | null;
  items: {
    id?: number;
    displayValue: string | number;
    value: string | number;
  }[];
};

export type Attribute = {
  attr: {
    id: number;
    name: string;
    items: {
      value: string | number;
      displayValue: string | number;
    }[];
    chosen: string | number | null;
  };
  handleUpdateAttribute?: (id: number, chosen: string | number) => void;
  isProductPage?: boolean;
};

export type OrderInput = {
  product_id: string;
  quantity: number;
  attributes: {
    name: string;
    chosen: string;
  }[];
};
