import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Shield, 
  Leaf, 
  Activity,
  Plus,
  Minus
} from 'lucide-react';

export interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    tagline: string;
    description: string;
    price: number;
    sizes: string[];
    images: string[];
    benefits: {
      icon: React.ReactNode;
      title: string;
      description: string;
    }[];
    nutritionFacts: {
      servingSize: string;
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
      probiotics: string;
    };
    ingredients: string[];
  };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Images */}
          <div className="sticky top-24">
            <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
              <motion.img
                key={selectedImage}
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index 
                      ? 'border-[color:var(--fresh-berry-red)]' 
                      : 'border-transparent hover:border-gray-200'
                  }`}
                >
                  <img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:py-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{product.tagline}</p>
            
            <div className="flex items-center gap-2 mb-8">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400">(124 reviews)</span>
            </div>

            <div className="prose prose-lg dark:prose-invert mb-8">
              <p>{product.description}</p>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-full border-2 transition-colors ${
                      selectedSize === size
                        ? 'border-[color:var(--fresh-berry-red)] bg-[color:var(--fresh-berry-red)]/10 text-[color:var(--fresh-berry-red)]'
                        : 'border-gray-200 dark:border-gray-700 hover:border-[color:var(--fresh-berry-red)] text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-full">
                <button
                  onClick={decrementQuantity}
                  className="p-2 hover:text-[color:var(--fresh-berry-red)] transition-colors"
                >
                  <Minus size={20} />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="p-2 hover:text-[color:var(--fresh-berry-red)] transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
              
              <button className="flex-1 bg-[color:var(--fresh-berry-red)] text-white px-8 py-3 rounded-full font-medium hover:bg-[color:var(--berry)] transition-colors flex items-center justify-center gap-2">
                <ShoppingBag size={20} />
                Add to Cart - KES {(product.price * quantity).toFixed(2)}
              </button>
              
              <button className="p-3 rounded-full border-2 border-gray-200 dark:border-gray-700 hover:border-[color:var(--fresh-berry-red)] transition-colors">
                <Heart size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Benefits */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[color:var(--fresh-berry-red)]/10 text-[color:var(--fresh-berry-red)]">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{benefit.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nutrition Facts */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Nutrition Facts</h3>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Serving Size: {product.nutritionFacts.servingSize}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {product.nutritionFacts.calories}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Calories</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {product.nutritionFacts.protein}g
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Protein</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {product.nutritionFacts.carbs}g
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Carbs</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {product.nutritionFacts.fat}g
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Fat</div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  Probiotics: {product.nutritionFacts.probiotics}
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Ingredients</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {product.ingredients.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 