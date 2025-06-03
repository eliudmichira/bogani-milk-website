import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';  // Corrected path based on project structure

interface CartIndicatorProps {
  theme?: 'light' | 'dark';
  accentColor?: string;
}

function CartIndicator({ theme = 'light', accentColor = '#e60000' }: CartIndicatorProps) {
  const { cartItems } = useCart();
  const itemCount = cartItems.length;
  
  return (
    <button className={`cart-indicator ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <ShoppingCart size={22} color={itemCount > 0 ? accentColor : undefined} />
      {itemCount > 0 && (
        <span 
          className="cart-badge"
          style={{
            backgroundColor: accentColor,
            color: 'white',
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            fontSize: '10px',
            fontWeight: 'bold',
            borderRadius: '50%',
            width: '16px',
            height: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {itemCount}
        </span>
      )}
    </button>
  );
}

export default CartIndicator; 