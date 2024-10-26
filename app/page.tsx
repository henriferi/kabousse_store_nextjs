// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Product } from './types/product';
import { ProductList } from './components/ProductList';
import { ProductDetail } from './components/ProductDetail';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Função para buscar produtos da API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/products');
        const data = await response.json();
        setProducts(data);
        applyFilters(data); // Aplica filtros ao carregar produtos
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Função para aplicar filtros
  const applyFilters = (products: Product[]) => {
    const filtered = products.filter((product) => {
      const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const inCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const inPriceRange =
        (minPrice === '' || product.price >= minPrice) &&
        (maxPrice === '' || product.price <= maxPrice);
      return matchesSearchTerm && inCategory && inPriceRange;
    });
    setFilteredProducts(filtered);
  };

  // Reaplica filtros ao alterar as entradas
  useEffect(() => {
    applyFilters(products);
    setCurrentPage(1); // Reseta a página atual ao alterar os filtros
  }, [searchTerm, selectedCategory, minPrice, maxPrice]);

  // Calcular produtos para a página atual
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Product Store</h1>

      {/* Barra de Pesquisa */}
      <div className="mb-4">
        <label htmlFor="search" className="font-medium">Search by Name: </label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type a product name..."
          className="ml-2 p-1 border border-gray-300 rounded"
        />
      </div>

      {/* Filtro de Categoria */}
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

      {/* Filtros de Faixa de Preço */}
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
        <>
          <ProductList products={currentProducts} onProductClick={setSelectedProduct} />

          {/* Controles de Paginação */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 mr-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 ml-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </main>
  );
}
