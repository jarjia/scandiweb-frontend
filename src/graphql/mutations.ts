import { gql } from "@apollo/client";

export const createOrderMutation = gql`
  mutation CreateOrder($data: [OrderInput]!) {
    createOrder(data: $data) {
      success
    }
  }
`;
