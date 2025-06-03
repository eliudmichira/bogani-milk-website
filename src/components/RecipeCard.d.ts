import React from "react";
interface Recipe {
    title: string;
    image: string;
    description: string;
    ingredients: string[];
}
interface RecipeCardProps {
    recipe: Recipe;
    isVisible: boolean;
}
declare const RecipeCard: React.FC<RecipeCardProps>;
export default RecipeCard;
