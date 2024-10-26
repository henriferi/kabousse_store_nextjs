import { Product } from '../types/product';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export function ProductDetail({ product, onBack }: ProductDetailProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-300">
      <button
        onClick={onBack}
        className="text-blue-500 hover:text-blue-700 mb-4 underline"
      >
        Back to Products
      </button>
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-4">Price: ${product.price}</p>
      <p className="text-gray-600">{product.description}</p>
    </div>
  );
}
