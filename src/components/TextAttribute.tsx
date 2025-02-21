import { clsx, convertToKebabCase } from "../helpers/helpers";
import { Attribute, AttributeItem } from "../types/types";

const TextAttribute: React.FC<Attribute> = ({
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
          "raleway-bold text-left",
          isProductPage ? "text-lg uppercase" : "capitalize text-cart"
        )}
      >
        {attr.name}:
      </h3>
      <div className="flex gap-1 py-0.5">
        {attr.items.map((item) => (
          <div
            data-testid={
              `product-attribute-${convertToKebabCase(attr.name)}-${
                item.value
              }` + (item.value === attr.chosen ? "-selected" : "")
            }
            key={item.value}
            onClick={() => handleChangeAttribute(item)}
            className={clsx(
              "select-none p-1 border-(length:--border-1) border-primary flex items-center justify-center raleway-bold",
              isProductPage
                ? "w-16 h-11 text-base cursor-pointer"
                : "min-w-6 min-h-6 text-sm",
              item.value === attr.chosen ? "bg-primary text-white" : ""
            )}
          >
            {item.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextAttribute;
