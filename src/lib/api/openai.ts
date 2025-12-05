import OpenAI from "openai";
import type { RecipeRequest, RecipeResponse, Recipe } from "./types";

/**
 * Service API OpenAI pour générer des recettes
 */
class OpenAIService {
  private client: OpenAI | null = null;
  private model: string;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    if (!apiKey) {
      console.warn(
        "OPENAI_API_KEY n'est pas définie. L'API OpenAI ne fonctionnera pas."
      );
      this.model = model;
      return;
    }

    this.client = new OpenAI({
      apiKey: apiKey,
    });
    this.model = model;
  }

  /**
   * Génère des recettes basées sur les ingrédients fournis
   */
  async generateRecipes(request: RecipeRequest): Promise<RecipeResponse> {
    if (!this.client) {
      return {
        recipes: [],
        success: false,
        error: "API OpenAI non configurée. Vérifiez votre clé API.",
      };
    }

    try {
      const prompt = this.buildPrompt(request);

      const completion = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: "system",
            content:
              process.env.SYSTEM_PROMPT ||
              "Tu es un chef cuisinier expert qui crée des recettes détaillées, délicieuses et faciles à suivre. Réponds toujours en JSON valide.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
      });

      const content = completion.choices[0]?.message?.content;

      if (!content) {
        return {
          recipes: [],
          success: false,
          error: "Aucune réponse de l'API OpenAI",
        };
      }

      const parsedResponse = JSON.parse(content);
      const recipes = this.parseRecipes(
        parsedResponse,
        request.numberOfRecipes || 3
      );

      return {
        recipes,
        success: true,
      };
    } catch (error) {
      console.error("Erreur lors de la génération de recettes:", error);
      return {
        recipes: [],
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Une erreur inconnue s'est produite",
      };
    }
  }

  /**
   * Construit le prompt pour l'API OpenAI
   */
  private buildPrompt(request: RecipeRequest): string {
    let prompt = `Crée ${request.numberOfRecipes || 3} recette(s) utilisant les ingrédients suivants : ${request.ingredients.join(", ")}.\n\n`;

    if (request.dietaryRestrictions && request.dietaryRestrictions.length > 0) {
      prompt += `Contraintes alimentaires : ${request.dietaryRestrictions.join(", ")}.\n\n`;
    }

    if (request.cuisineType) {
      prompt += `Type de cuisine : ${request.cuisineType}.\n\n`;
    }

    prompt += `Réponds en JSON avec cette structure exacte :
{
  "recipes": [
    {
      "id": "unique-id",
      "title": "Nom de la recette",
      "description": "Description courte",
      "ingredients": [
        {"name": "nom", "quantity": "quantité", "unit": "unité"}
      ],
      "instructions": ["étape 1", "étape 2", ...],
      "prepTime": 15,
      "cookTime": 30,
      "servings": 4,
      "difficulty": "facile|moyen|difficile",
      "tags": ["tag1", "tag2"]
    }
  ]
}`;

    return prompt;
  }

  /**
   * Parse la réponse de l'API et valide les recettes
   */
  private parseRecipes(
    response: { recipes?: unknown[] },
    expectedCount: number
  ): Recipe[] {
    if (!response.recipes || !Array.isArray(response.recipes)) {
      return [];
    }

    return response.recipes
      .slice(0, expectedCount)
      .filter(
        (recipe): recipe is Record<string, unknown> =>
          typeof recipe === "object" && recipe !== null
      )
      .map((recipe, index) => ({
        id:
          typeof recipe.id === "string"
            ? recipe.id
            : `recipe-${Date.now()}-${index}`,
        title:
          typeof recipe.title === "string"
            ? recipe.title
            : "Recette sans titre",
        description:
          typeof recipe.description === "string" ? recipe.description : "",
        ingredients: Array.isArray(recipe.ingredients)
          ? recipe.ingredients
          : [],
        instructions: Array.isArray(recipe.instructions)
          ? recipe.instructions
          : [],
        prepTime: typeof recipe.prepTime === "number" ? recipe.prepTime : 0,
        cookTime: typeof recipe.cookTime === "number" ? recipe.cookTime : 0,
        servings: typeof recipe.servings === "number" ? recipe.servings : 1,
        difficulty:
          recipe.difficulty === "facile" ||
          recipe.difficulty === "moyen" ||
          recipe.difficulty === "difficile"
            ? recipe.difficulty
            : "moyen",
        tags: Array.isArray(recipe.tags) ? recipe.tags : [],
      }));
  }

  /**
   * Vérifie si l'API est configurée
   */
  isConfigured(): boolean {
    return this.client !== null;
  }
}

// Export d'une instance singleton
export const openAIService = new OpenAIService();

// Export de la classe pour les tests
export default OpenAIService;
