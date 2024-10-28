'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Product } from '../types/product'; 
import Header from '../components/Header';

export default function Cart() {
  const router = useRouter();
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/products');
        const data = await response.json();
        setProducts(data);
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



  const calculateTotal = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find((p) => p.id === Number(productId));
      return total + (product ? product.price * quantity : 0);
    }, 0);
  };


  const removeOneFromCart = (productId: number) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[productId] > 1) {
        newCart[productId] -= 1; 
      } else {
        delete newCart[productId]; 
      }
      localStorage.setItem('cart', JSON.stringify(newCart)); 
      return newCart;
    });
  };


  const finalizeOrder = () => {
    setCart({});
    localStorage.removeItem('cart'); 
    alert('Order placed successfully, congratulations!');
    router.push('/products'); 
  };

  return (
    <>
      <Header />
      <main className="max-w-4xl rounded-md bg-white my-5 mx-auto p-6">
        <h1 className="text-3xl font-bold text-green-500 flex flex-col justify-center text-center mb-6">
          Your Cart
          <FaShoppingCart className="text-6xl text-gray-400 mt-4" />
        </h1>

        {Object.keys(cart).length === 0 ? (
          <div className="text-center">
            <p className="text-xl">Your cart is empty!</p>
            <button
              onClick={() => router.push('/products')}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Back to Products
            </button>
          </div>
        ) : (
          <div>
            {Object.entries(cart).map(([productId, quantity]) => {
              const product = products.find((p) => p.id === Number(productId));
              return (
                product && (
                  <div key={product.id} className="flex justify-between items-center border-b py-2">
                    <div>
                      <h2 className="text-lg font-bold">{product.name}</h2>
                      <p className="text-green-500">R$ {product.price.toFixed(2)} x {quantity} = R$ {(product.price * quantity).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => removeOneFromCart(product.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )
              );
            })}

            <div className="mt-4">
              <h3 className="text-lg font-bold">Total: R$ {calculateTotal().toFixed(2)}</h3>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => router.push('/products')}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Continue Shopping
              </button>
              <button
                onClick={finalizeOrder}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Finalize Order
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
