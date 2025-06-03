import { Search } from 'lucide-react';

interface SearchTriggerProps {
  theme?: 'light' | 'dark';
  accentColor?: string;
  onClick?: () => void;
}

export default function SearchTrigger({ 
  theme = 'light', 
  accentColor = '#e60000', 
  onClick 
}: SearchTriggerProps) {
  return (
    <button 
      className={`search-trigger p-2 rounded-full ${theme === 'dark' ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-black/5'}`}
      onClick={onClick}
      aria-label="Search"
    >
      <Search 
        size={22} 
        className="transition-colors duration-200"
        color={accentColor}
      />
    </button>
  );
} 