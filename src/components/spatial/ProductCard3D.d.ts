interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}
interface ProductCard3DProps {
    item: CartItem;
    onQuantityChange: (id: string, newQuantity: number) => void;
    onRemove: (id: string) => void;
    position?: [number, number, number];
}
export default function ProductCard3D({ item, onQuantityChange, onRemove, position }: ProductCard3DProps): import("react/jsx-runtime").JSX.Element;
export {};
