'use client';

import { useEffect, useState } from 'react';
import { Product } from '../types/product';
import { ProductDetail } from '../components/ProductDetail';
import Header from '../components/Header';
import { useRouter } from 'next/navigation';
import { FaShoppingCart } from 'react-icons/fa'; 

export default function Products() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [minPrice, setMinPrice] = useState<number | ''>(''); 
  const [maxPrice, setMaxPrice] = useState<number | ''>(''); 
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [cart, setCart] = useState<{ [key: number]: number }>({}); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/products');
        const data = await response.json();
        setProducts(data);
        applyFilters(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

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


  useEffect(() => {
    applyFilters(products);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, minPrice, maxPrice]);


  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const addToCart = (productId: any) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId]) {
        updatedCart[productId] += 1; 
      } else {
        updatedCart[productId] = 1; 
      }
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };


  const totalItems = Object.values(cart).reduce((acc, qty) => acc + qty, 0);

  return (
    <>
  <Header />
  <main className="max-w-7xl rounded-md bg-white my-5 mx-auto p-6">
    <h1 className="text-3xl font-bold bg-black p-4 text-green-500 rounded-md text-center mb-6">
      KABOUSSE PRODUCTS
    </h1>

    <div className="flex justify-center mb-4">
      <button
        className="flex items-center justify-center gap-2 bg-green-500 text-white w-24 py-2 rounded-md relative hover:bg-green-600"
        onClick={() => router.push('/cart')}
      >
        <FaShoppingCart className="text-2xl" />
        <span className="font-medium">CART</span>
        {totalItems > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-x px-2 transform translate-x-1/2 -translate-y-1/2">
            {totalItems}
          </span>
        )}
      </button>
    </div>


    <div className="mb-4">
      <label htmlFor="search" className="font-medium text-black">Search by Name: </label>
      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Type a product name..."
        className="ml-2 p-1 border border-gray-300 rounded"
      />
    </div>


    <div className="mb-4">
      <label htmlFor="category" className="font-medium text-black">Filter by Category: </label>
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

    <div className="mb-4 flex gap-4">
      <div>
        <label htmlFor="minPrice" className="font-medium text-black">Min Price: </label>
        <input
          id="minPrice"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value ? parseInt(e.target.value) : '')}
          className="ml-2 p-1 border border-gray-300 rounded w-20"
        />
      </div>
      <div>
        <label htmlFor="maxPrice" className="font-medium text-black">Max Price: </label>
        <input
          id="maxPrice"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value ? parseInt(e.target.value) : '')}
          className="ml-2 p-1 border border-gray-300 rounded w-20"
        />
      </div>
    </div>

    {selectedProduct ? (
      <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
    ) : (
      <>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {currentProducts.map((product) => (
            <div key={product.id} className="bg-black text-white p-4 rounded-lg shadow-md relative">
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-green-500">R$ {product.price.toFixed(2)}</p>
              <button
                onClick={() => addToCart(product.id)} 
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add to Cart
              </button>
              <button
                onClick={() => setSelectedProduct(product)}
                className="mt-2 ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="w-24 py-2 mr-2 bg-green-500 hover:bg-green-600 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="w-24 py-2 ml-2 bg-green-500 hover:bg-green-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </>
    )}
  </main>
</>
  );
}
