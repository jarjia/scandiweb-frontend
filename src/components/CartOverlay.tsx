import { useContext } from "react";
import SwatchAttribute from "./SwatchAttribute";
import TextAttribute from "./TextAttribute";
import { AppContext } from "../context/AppContext";
import { useMutation } from "@apollo/client";
import { createOrderMutation } from "../graphql/mutations";

const CartOverlay: React.FC<{ cartOverlay: boolean }> = ({ cartOverlay }) => {
  const {
    cart: cartItems,
    cartItemLength,
    handleUpdateQuantity,
    handlePlaceOrder,
  } = useContext(AppContext);
  const [createOrder] = useMutation(createOrderMutation);

  const handleCreateOrder = async () => {
    try {
      const res = await createOrder({
        variables: {
          data: cartItems.map((item) => {
            return {
              product_id: item.id,
              quantity: item.quantity,
              attributes: JSON.stringify(
                item.attributes?.map((attr) => {
                  return {
                    name: attr.name,
                    chosen: attr.chosen,
                  };
                })
              ),
            };
          }),
        },
      });

      if (res.data.createOrder.success) handlePlaceOrder();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside
      data-testid="cart-overlay"
      style={{ display: cartOverlay ? "block" : "none" }}
      className="fixed max-h-[80vh] max-w-96 min-w-64 overflow-y-scroll scrollbar z-10 top-20 right-8 bg-white"
    >
      <div className="flex flex-col gap-4 items-start justify-between p-3 pt-4 h-full">
        <h3 className="capitalize text-left">
          <strong className="raleway-bold pr-1">my bag,</strong>
          <span data-testid="cart-item-amount">
            {`${cartItemLength} item${cartItemLength === 1 ? "" : "s"}`}
          </span>
        </h3>
        {cartItems &&
          cartItems.map((cartItem) => (
            <div
              key={cartItem.key}
              className="grid grid-cols-[50%_10%_40%] gap-1 my-2 items-center w-full"
            >
              <div className="flex flex-col items-start justify-center">
                <h3 className="text-left">{cartItem.name}</h3>
                <span className="raleway-bold">
                  {cartItem.price.currency.symbol}
                  {cartItem.price.amount}
                </span>
                {cartItem.attributes && cartItem.attributes.length > 0 && (
                  <>
                    {cartItem.attributes.map((attr) => (
                      <div key={attr.id} className="flex flex-col items-start">
                        <h4 className="capitalize text-[1.5ch] text-left">
                          {attr.name}:
                        </h4>
                        {attr.type === "text" ? (
                          <TextAttribute attr={attr} />
                        ) : attr.type === "swatch" ? (
                          <SwatchAttribute attr={attr} />
                        ) : null}
                      </div>
                    ))}
                  </>
                )}
              </div>
              <div className="flex flex-col justify-between items-center h-full">
                <button
                  data-testid="cart-item-amount-increase"
                  onClick={() =>
                    handleUpdateQuantity(cartItem.key, cartItem.quantity + 1)
                  }
                  className="cursor-pointer flex justify-center items-center w-6 h-6 border-[1px] border-primary relative"
                >
                  <div className="absolute w-2.5 border-[1px] bg-primary"></div>
                  <div className="absolute border-[1px] h-2.5 bg-primary"></div>
                </button>
                <span>{cartItem.quantity}</span>
                <button
                  data-testid="cart-item-amount-decrease"
                  onClick={() =>
                    handleUpdateQuantity(cartItem.key, cartItem.quantity - 1)
                  }
                  className="cursor-pointer flex justify-center items-center w-6 h-6 border-[1px] border-primary relative"
                >
                  <div className="absolute w-2.5 border-[1px] bg-primary"></div>
                </button>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src={cartItem.gallery}
                  alt={cartItem.name}
                  className="max-h-[25vh]"
                />
              </div>
            </div>
          ))}
        <div className="w-full">
          <div
            data-testid="cart-total"
            className="flex py-4 raleway-bold w-full justify-between"
          >
            <span>Total</span>
            <span>
              $
              {cartItems
                .reduce(
                  (total, newVal) =>
                    total + parseFloat(newVal.price.amount) * newVal.quantity,
                  0
                )
                .toFixed(2)}
            </span>
          </div>
          <button
            disabled={cartItems.length === 0}
            onClick={() => handleCreateOrder()}
            className={`${
              cartItems.length === 0
                ? "grayscale-50 cursor-not-allowed"
                : "cursor-pointer"
            } uppercase text-white bg-link-hover hover:opacity-95 w-full py-2.5`}
          >
            place order
          </button>
        </div>
      </div>
    </aside>
  );
};

export default CartOverlay;
