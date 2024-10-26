import { Product } from '../types/product';

export const getProducts = (): Product[] => [
  { id: 1, name: 'Laptop', price: 1500, description: 'A high-performance laptop', category: 'Electronics' },
  { id: 2, name: 'Headphones', price: 200, description: 'Noise-cancelling headphones', category: 'Accessories' },
  { id: 3, name: 'Smartphone', price: 999, description: 'Latest model smartphone', category: 'Electronics' },
  { id: 4, name: 'Backpack', price: 50, description: 'Durable travel backpack', category: 'Accessories' },
];
