import { type ReactNode } from 'react';
interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}
interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}
export declare function useCart(): CartContextType;
interface CartProviderProps {
    children: ReactNode;
}
export declare function CartProvider({ children }: CartProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
