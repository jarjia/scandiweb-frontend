import { useContext, useEffect, useState } from "react";
import SwatchAttribute from "../components/SwatchAttribute";
import TextAttribute from "../components/TextAttribute";
import parse from "html-react-parser";
import { useQuery } from "@apollo/client";
import { getProductQuery } from "../graphql/queries";
import { useParams } from "react-router-dom";
import { Attributes, Product } from "../types/types";
import { AppContext } from "../context/AppContext";

type ProductWithDescription = Product &
  Partial<{ description: string; gallery: string[] }>;

const ProductPage = () => {
  const { product_id } = useParams();
  const { handleAddCartItem } = useContext(AppContext);
  const { data, loading } = useQuery(getProductQuery, {
    variables: { product_id },
  });
  const [slide, setSlide] = useState(0);
  const [product, setProduct] = useState<ProductWithDescription | null>(null);

  useEffect(() => {
    if (!loading) {
      const stateData = data.product.attributes && {
        ...data.product,
        attributes: data.product.attributes.map((item: Attributes) => ({
          ...item,
          chosen: null,
        })),
      };
      setProduct(stateData);
    }
  }, [loading]);

  const handleSlide = (newSlide: number) => {
    if (product)
      setSlide(Math.max(0, Math.min(newSlide, product.gallery.length - 1)));
  };

  const handleUpdateAttribute = (id: number, chosen: string | number) => {
    setProduct(
      (prevProduct) =>
        prevProduct && {
          ...prevProduct,
          attributes: prevProduct.attributes?.map((attr) =>
            attr.id === id ? { ...attr, chosen } : attr
          ),
        }
    );
  };

  if (!product) return;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[60%_40%]">
      <div data-testid="product-gallery" className="flex gap-4">
        <div className="flex flex-col items-center gap-2 min-w-20 max-w-20 max-h-20">
          {product.gallery.map((img, index) => (
            <img
              key={img}
              src={img}
              onClick={() => handleSlide(index)}
              className="cursor-pointer w-fit"
            />
          ))}
        </div>
        <div className="relative h-fit w-full">
          <button
            onClick={() => handleSlide(slide + 1)}
            className="z-4 absolute top-[calc(50%-32px)] cursor-pointer mr-3 right-0 flex items-center justify-center w-8 h-8 bg-[#000000BA]"
          >
            <img src="/arrow.svg" />
          </button>
          <div className="w-full max-h-478px min-h-478px h-full scrollbar overflow-y-scroll overflow-x-hidden">
            <div className="flex items-center min-h-478px">
              {product.gallery.map((img, index) => (
                <img
                  key={img}
                  src={img}
                  className="min-w-full transition-transform"
                  style={{
                    transform: `translateX(-${slide}00%)`,
                    height: index !== slide ? "0" : "100%",
                  }}
                />
              ))}
            </div>
          </div>
          <button
            onClick={() => handleSlide(slide - 1)}
            className="z-4 absolute ml-3 top-[calc(50%-32px)] cursor-pointer left-0 rotate-180 flex items-center justify-center w-8 h-8 bg-[#000000BA]"
          >
            <img src="/arrow.svg" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-6 text-left w-full lg:pl-28">
        <h1 className="text-3xl raleway-bold capitalize">{product.name}</h1>
        {product.attributes &&
          product.attributes.map((attr) => {
            return (
              <div key={attr.id}>
                {attr.type === "text" ? (
                  <TextAttribute
                    attr={attr}
                    isProductPage
                    handleUpdateAttribute={handleUpdateAttribute}
                  />
                ) : attr.type === "swatch" ? (
                  <SwatchAttribute
                    attr={attr}
                    isProductPage
                    handleUpdateAttribute={handleUpdateAttribute}
                  />
                ) : null}
              </div>
            );
          })}
        <div>
          <h3 className="mb-4 uppercase raleway-bold text-lg">price:</h3>
          <span className="text-2xl">
            {product.price.currency.symbol}
            {product.price.amount}
          </span>
        </div>
        <button
          onClick={() => {
            if (product.inStock) {
              const cartData = { ...product };
              delete cartData.description;
              cartData.attributes = cartData.attributes?.map((attr) => ({
                ...attr,
                chosen: attr.items[0]?.value,
              }));
              handleAddCartItem({
                ...cartData,
                key: `${cartData.id}${cartData.attributes
                  ?.map((attr) => attr.chosen)
                  .join("-")}`,
                gallery: cartData.gallery[0],
              });
            }
          }}
          disabled={!product.inStock}
          className={`${
            product.inStock
              ? "bg-link-hover hover:opacity-95 cursor-pointer"
              : "cursor-not-allowed bg-gray-400"
          } uppercase text-white text-base w-73 h-13`}
          data-testid="add-to-cart"
        >
          add to cart
        </button>
        <div className="parse" data-testid="product-description">
          {product.description && parse(product.description)}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
