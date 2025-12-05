/**
 * Types TypeScript pour les réponses de l'API OpenAI
 */

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  prepTime: number; // en minutes
  cookTime: number; // en minutes
  servings: number;
  difficulty: "facile" | "moyen" | "difficile";
  tags?: string[];
}

export interface Ingredient {
  name: string;
  quantity: string;
  unit?: string;
}

export interface RecipeRequest {
  ingredients: string[];
  dietaryRestrictions?: string[];
  cuisineType?: string;
  numberOfRecipes?: number;
}

export interface RecipeResponse {
  recipes: Recipe[];
  success: boolean;
  error?: string;
}

export interface OpenAIError {
  message: string;
  type: string;
  code?: string;
}
