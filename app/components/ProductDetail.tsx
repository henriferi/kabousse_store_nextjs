import { Product } from '../types/product';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export function ProductDetail({ product, onBack }: ProductDetailProps) {
  return (
    <div className="p-6 bg-zinc-900 text-white rounded-lg shadow-md border border-gray-300">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400 transition duration-200"
      >
        Back to Products
      </button>
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <p className="text-green-500 mb-4">Price: R$ {product.price.toFixed(2)}</p>
      <p className="text-gray-300">{product.description}</p>
    </div>
  );
}
