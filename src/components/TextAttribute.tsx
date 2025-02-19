import { convertToKebabCase } from "../helpers/helpers";
import { Attribute } from "../types/types";

const TextAttribute: React.FC<Attribute> = ({
  attr,
  handleUpdateAttribute,
  isProductPage = false,
}) => {
  const datatestid = isProductPage ? "product" : "cart-item";

  return (
    <div
      data-testid={`${datatestid}-attribute-${convertToKebabCase(attr.name)}`}
      className="flex gap-1 py-0.5"
    >
      {attr.items.map((item) => (
        <div
          data-testid={
            `${datatestid}-attribute-${convertToKebabCase(attr.name)}-${
              item.displayValue
            }` + (item.value === attr.chosen ? "-selected" : "")
          }
          key={item.value}
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
            item.value === attr.chosen ? "bg-primary text-white" : ""
          } ${
            isProductPage
              ? "w-16 h-11 text-base cursor-pointer"
              : "min-w-6 min-h-6 text-[14px]"
          } p-[1px] border-[1px] flex items-center justify-center border-primary raleway-bold`}
        >
          {item.value}
        </div>
      ))}
    </div>
  );
};

export default TextAttribute;
