import { useContext, useState } from "react";
import CartIcon from "./icons/CartIcon";
import { useNavigate } from "react-router-dom";
import { Product } from "../types/types";
import { AppContext } from "../context/AppContext";
import { convertToKebabCase } from "../helpers/helpers";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { handleAddCartItem } = useContext(AppContext);
  const [hovering, setHovering] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      data-testid={`product-${convertToKebabCase(product.name)}`}
      className="text-left cursor-pointer w-full h-full p-3 hover:shadow-product-card transition-shadow"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative flex items-center h-4/5 justify-center pb-2 max-h-84">
        {!product.inStock && (
          <p
            className="absolute uppercase text-2xl text-out-of-stock z-4"
            style={{
              opacity: 1,
              textShadow: "2px 2px 2px rgba(0,0,0,1)",
            }}
          >
            out of stock
          </p>
        )}
        <img
          src={product.gallery}
          className="max-h-full"
          alt={product.name}
          style={{ opacity: product.inStock ? 1 : 0.6 }}
        />
      </div>
      <div
        className="flex justify-between pt-2 text-base-plus"
        style={{ opacity: product.inStock ? 1 : 0.6 }}
      >
        <div className="flex flex-col gap-1">
          <p className="font-light">{product.name}</p>
          <p className="raleway-bold">
            {product.price.currency.symbol}
            {parseFloat(product.price.amount).toFixed(2)}
          </p>
        </div>
        {hovering && product.inStock && (
          <div className="relative bottom-6 right-12">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddCartItem({
                  ...product,
                  key: `${product.id}${product.attributes
                    ?.map((attr) => attr.items[0].value)
                    .join("-")}`,
                  attributes: product.attributes?.map((attr) => {
                    return {
                      ...attr,
                      chosen: attr.items[0].value,
                    };
                  }),
                  quantity: 1,
                });
              }}
              className="absolute block cursor-pointer p-3.5 bg-link-hover rounded-full hover:scale-105 active:scale-95"
            >
              <CartIcon color="white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
