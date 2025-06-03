import React from 'react';
interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    color: string;
    model3D?: string;
}
declare const ProductScene3D: React.FC<{
    items: CartItem[];
    activeItemId: string | null;
    onItemClick: (id: string) => void;
    removingIds: string[];
}>;
export default ProductScene3D;
