import { convertToKebabCase } from "../helpers/helpers";
import { Attribute } from "../types/types";

const SwatchAttribute: React.FC<Attribute> = ({
  attr,
  handleUpdateAttribute,
  isProductPage = false,
}) => {
  return (
    <div className="flex gap-1">
      {attr.items.map((item) => (
        <div
          key={item.value}
          data-testid={
            `cart-item-attribute-${convertToKebabCase(
              attr.name
            )}-${convertToKebabCase(attr.name)}` +
            (item.value === attr.chosen ? "-selected" : "")
          }
          onClick={() => {
            if (
              item.value === attr.chosen ||
              !isProductPage ||
              !handleUpdateAttribute
            )
              return;
            handleUpdateAttribute(attr.id, item.value);
          }}
          className={`${
            item.value === attr.chosen
              ? "border-green-400"
              : "border-transparent"
          } ${
            isProductPage ? "w-9 h-9 cursor-pointer" : "w-5 h-5"
          }  border-[1px] flex items-center justify-center`}
        >
          <div
            className={`${isProductPage ? "w-8 h-8" : "w-4 h-4"} border-[1px] ${
              item.value === attr.chosen
                ? "border-transparent"
                : "border-gray-300"
            }`}
            style={{ background: item.value }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default SwatchAttribute;
