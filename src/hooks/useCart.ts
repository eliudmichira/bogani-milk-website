import { useState, useCallback } from 'react';

// Define Product interface here for now, assuming it's needed by useCart.
// Ideally, this would come from a shared types definition file.
// This definition was present in Home.tsx and ProductShowcaseSection.tsx
export interface Product {
  name: string;
  description: string;
  image: string;
  price: number;
  icon?: string;
  tags?: string[];
  isNew?: boolean;
  benefits?: string[];
  [key: string]: any;
}

const useCart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = useCallback((product: Product) => {
    setCartItems(prev => [...prev, product]);
    // In a real app, you might want to handle quantity or check if item already exists
    console.log(`${product.name} added to cart.`);
  }, []);

  // Add other cart functions if they were in the original hook
  // e.g., removeFromCart, updateQuantity, clearCart

  return { cartItems, addToCart };
};

export default useCart;
