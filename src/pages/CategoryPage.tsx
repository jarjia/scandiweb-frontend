import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getProductsPageQuery } from "../graphql/queries";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/types";

const CategoryPage = () => {
  const { category } = useParams();
  const { data, loading } = useQuery(getProductsPageQuery, {
    variables: { category },
  });

  return (
    <div>
      <h1 className="text-left capitalize text-4xl mb-10 raleway-bold">
        {category}
      </h1>
      {!loading && (
        <div className="grid grid-cols-3 items-center gap-12">
          {data.products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
