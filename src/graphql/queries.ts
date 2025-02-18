import { gql } from "@apollo/client";

export const getProductsPageQuery = gql`
  query ProductsPage($category: String!) {
    products(category: $category) {
      id
      name
      gallery
      inStock
      price {
        amount
        currency {
          symbol
        }
      }
      attributes {
        id
        type
        name
        items {
          value
          displayValue
        }
      }
    }
  }
`;

export const getProductQuery = gql`
  query ProductPage($product_id: String!) {
    product(product_id: $product_id) {
      id
      name
      gallery
      description
      inStock
      price {
        amount
        currency {
          symbol
        }
      }
      attributes {
        id
        type
        name
        items {
          id
          value
          displayValue
        }
      }
    }
  }
`;
