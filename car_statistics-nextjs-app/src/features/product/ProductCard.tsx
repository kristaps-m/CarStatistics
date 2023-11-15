import { Product } from "../../app/models/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div
      data-testid="productCard-1"
      className="p-3 m-3 bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <img
        src={`https://picsum.photos/id/${product.id + 10}/200/300`}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm">
          Price: ${product.price.toFixed(2)}
        </p>
        <p className="text-gray-600 text-sm">Category: {product.category}</p>
        <a href={`/products/${product.id}`}>
          <button className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full">
            View
          </button>
        </a>
      </div>
    </div>
  );
}
