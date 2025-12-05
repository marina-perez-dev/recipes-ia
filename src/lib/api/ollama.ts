import type { RecipeRequest, RecipeResponse, Recipe } from "./types";

/**
 * Service API Ollama pour générer des recettes
 * Ollama permet d'exécuter des modèles localement sans clé API
 */
class OllamaService {
  private baseUrl: string;
  private model: string;

  constructor() {
    this.baseUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
    this.model = process.env.OLLAMA_MODEL || "llama3.2";
  }

  /**
   * Génère des recettes basées sur les ingrédients fournis
   */
  async generateRecipes(request: RecipeRequest): Promise<RecipeResponse> {
    try {
      const prompt = this.buildPrompt(request);

      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: this.model,
          prompt: prompt,
          stream: false,
          format: "json",
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Erreur Ollama: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      const content = data.response;

      if (!content) {
        return {
          recipes: [],
          success: false,
          error: "Aucune réponse de l'API Ollama",
        };
      }

      // Ollama peut retourner du JSON avec du markdown, on nettoie
      const cleanedContent = content
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();

      const parsedResponse = JSON.parse(cleanedContent);
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
   * Construit le prompt pour l'API Ollama
   */
  private buildPrompt(request: RecipeRequest): string {
    const systemPrompt =
      process.env.SYSTEM_PROMPT ||
      "Tu es un chef cuisinier expert qui crée des recettes détaillées, délicieuses et faciles à suivre. Réponds toujours en JSON valide.";

    let prompt = `${systemPrompt}\n\nCrée ${request.numberOfRecipes || 3} recette(s) utilisant les ingrédients suivants : ${request.ingredients.join(", ")}.\n\n`;

    if (request.dietaryRestrictions && request.dietaryRestrictions.length > 0) {
      prompt += `Contraintes alimentaires : ${request.dietaryRestrictions.join(", ")}.\n\n`;
    }

    if (request.cuisineType) {
      prompt += `Type de cuisine : ${request.cuisineType}.\n\n`;
    }

    prompt += `Réponds UNIQUEMENT en JSON avec cette structure exacte (sans texte avant ou après) :
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
   * Vérifie si Ollama est accessible
   */
  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`, {
        method: "GET",
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Export d'une instance singleton
export const ollamaService = new OllamaService();

// Export de la classe pour les tests
export default OllamaService;
