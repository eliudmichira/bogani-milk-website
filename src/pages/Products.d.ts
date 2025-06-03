import React from "react";
interface ProductSize {
    size: string;
    price: number;
}
interface ProductNutrition {
    calories: number;
    protein: string;
    fat: string;
    carbs: string;
    probiotics: string;
}
export interface Product {
    id: number;
    name: string;
    type: string;
    category: string;
    flavor: string;
    image: string;
    colorCode: string;
    price: number;
    rating: number;
    reviews: number;
    description: string;
    sizes: ProductSize[];
    benefits: string[];
    nutrition: ProductNutrition;
    featured: boolean;
    new: boolean;
}
export declare const productsData: Product[];
export default function Products(): React.ReactNode;
export {};
