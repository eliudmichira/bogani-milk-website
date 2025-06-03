interface ProductFlipCardProps {
    image: string;
    flavor: 'strawberry' | 'vanilla';
    name: string;
    description: string;
    price: string;
    onAddToCart: () => void;
}
declare const ProductFlipCard: React.FC<ProductFlipCardProps>;
export default ProductFlipCard;
