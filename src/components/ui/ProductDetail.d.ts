import React from 'react';
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
declare const ProductDetail: React.FC<ProductDetailProps>;
export default ProductDetail;
