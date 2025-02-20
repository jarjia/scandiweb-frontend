import { clsx, convertToKebabCase } from "../helpers/helpers";
import { Attribute, AttributeItem } from "../types/types";

const SwatchAttribute: React.FC<Attribute> = ({
  attr,
  handleUpdateAttribute,
  isProductPage = false,
}) => {
  const handleChangeAttribute = (item: AttributeItem) => {
    if (item.value === attr.chosen || !isProductPage || !handleUpdateAttribute)
      return;
    handleUpdateAttribute(attr.id, item.value);
  };

  return (
    <div data-testid={`product-attribute-${convertToKebabCase(attr.name)}`}>
      <h3
        className={clsx(
          "raleway-bold",
          isProductPage ? "text-lg uppercase" : "capitalize text-cart"
        )}
      >
        {attr.name}:
      </h3>
      <div className="flex gap-1">
        {attr.items.map((item) => (
          <div
            key={item.value}
            data-testid={
              `product-attribute-${convertToKebabCase(attr.name)}-${
                item.value
              }` + (item.value === attr.chosen ? "-selected" : "")
            }
            onClick={() => handleChangeAttribute(item)}
            className={clsx(
              "border-(length:--border-1) flex items-center justify-center",
              isProductPage ? "w-9 h-9 cursor-pointer" : "w-5 h-5",
              item.value === attr.chosen
                ? "border-green-400"
                : "border-transparent"
            )}
          >
            <div
              className={clsx(
                "border-(length:--border-1)",
                isProductPage ? "w-8 h-8" : "w-4 h-4",
                item.value === attr.chosen
                  ? "border-transparent"
                  : "border-gray-300"
              )}
              style={{ background: item.value }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwatchAttribute;
