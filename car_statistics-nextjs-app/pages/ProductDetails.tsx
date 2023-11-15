import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Product } from "../src/app/models/product";
import agent from "../src/app/api/agent";
import { NavigationButtons } from "@/app/NavigationButtons";
import "./../src/app/globals.css";

const ProductDetails = () => {
  const router = useRouter();
  const { productId } = router.query; // Access the product ID from the route parameter
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      agent.Catalog.details(Number(productId))
        .then((data) => {
          const idToFind = Number(productId);
          const foundProduct = data.products.find(
            (p: Product) => p.id === idToFind
          );
          if (foundProduct) {
            setProduct(foundProduct);
          } else {
            console.error("No product data found.");
          }
        })
        .catch((error) => console.error("Error fetching product data:", error))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [productId]);

  return (
    <div data-testid="productDetails-1">
      <NavigationButtons />
      <div className="flex justify-center items-center min-h-screen">
        {loading ? (
          <p>Loading...</p>
        ) : product ? (
          <div className="product-details">
            <h1 className="text-5xl">{product.name}</h1>
            <img
              src={`https://picsum.photos/id/${product.id + 10}/400/300`}
              alt={product.name}
              className="w-full pt-5 w-30 object-cover mb-4 transition-transform transform hover:scale-105"
            />
            <h2>
              Price: {product.price} {product.currency}
            </h2>
            <h2>Category: {product.category}</h2>
            <h2>Description: {product.description}</h2>
          </div>
        ) : (
          <p>No product found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
