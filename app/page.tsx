'use client';

import { useState } from 'react';
import { getProducts } from './functions/productData';
import { Product } from './types/product';
import { ProductList } from './components/ProductList';
import { ProductDetail } from './components/ProductDetail';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const products = getProducts();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Product Store</h1>
      {selectedProduct ? (
        <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
      ) : (
        <ProductList products={products} onProductClick={setSelectedProduct} />
      )}
    </main>
  );
}
