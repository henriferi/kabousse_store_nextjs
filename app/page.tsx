'use client';

import { useState } from 'react';
import { getProducts } from './functions/productData';
import { Product } from './types/product';
import { ProductList } from './components/ProductList';
import { ProductDetail } from './components/ProductDetail';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');

  const products = getProducts();

  const filteredProducts = products.filter((product) =>{
    const inCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const inPriceRange = 
      (minPrice === '' || product.price >= minPrice) &&
      (maxPrice === '' || product.price <= maxPrice)
    return inCategory && inPriceRange;
  })

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Product Store</h1>
      
      {/* Seletor de categoria */}
      <div className="mb-4">
        <label htmlFor="category" className="font-medium">Filter by Category: </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="ml-2 p-1 border border-gray-300 rounded"
        >
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      {/* Campos de faixa de preço */}
      <div className="mb-4 flex gap-4">
        <div>
          <label htmlFor="minPrice" className="font-medium">Min Price: </label>
          <input
            id="minPrice"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value ? parseInt(e.target.value) : '')}
            className="ml-2 p-1 border border-gray-300 rounded w-20"
          />
        </div>
        <div>
          <label htmlFor="maxPrice" className="font-medium">Max Price: </label>
          <input
            id="maxPrice"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value ? parseInt(e.target.value) : '')}
            className="ml-2 p-1 border border-gray-300 rounded w-20"
          />
        </div>
      </div>

      {/* Renderização condicional de produtos */}
      {selectedProduct ? (
        <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
      ) : (
        <ProductList products={filteredProducts} onProductClick={setSelectedProduct} />
      )}
    </main>
  );
}
