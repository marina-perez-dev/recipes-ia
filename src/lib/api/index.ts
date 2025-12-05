import { openAIService } from "./openai";
import { ollamaService } from "./ollama";
import type { RecipeRequest, RecipeResponse } from "./types";

/**
 * Service unifié pour générer des recettes
 * Sélectionne automatiquement entre OpenAI et Ollama selon la configuration
 */
class RecipeAIService {
  private provider: "openai" | "ollama" | "auto";

  constructor() {
    // Détermine le provider à utiliser
    const providerEnv = process.env.AI_PROVIDER?.toLowerCase();

    if (providerEnv === "openai" || providerEnv === "ollama") {
      this.provider = providerEnv;
    } else {
      // Auto-détection : Ollama si disponible, sinon OpenAI
      this.provider = "auto";
    }
  }

  /**
   * Génère des recettes en utilisant le provider configuré
   */
  async generateRecipes(request: RecipeRequest): Promise<RecipeResponse> {
    const provider = await this.getProvider();

    switch (provider) {
      case "ollama":
        return ollamaService.generateRecipes(request);
      case "openai":
        return openAIService.generateRecipes(request);
      default:
        return {
          recipes: [],
          success: false,
          error: "Aucun provider IA configuré. Configurez OpenAI ou Ollama.",
        };
    }
  }

  /**
   * Détermine le provider à utiliser
   */
  private async getProvider(): Promise<"openai" | "ollama" | null> {
    if (this.provider === "openai") {
      return openAIService.isConfigured() ? "openai" : null;
    }

    if (this.provider === "ollama") {
      const available = await ollamaService.isAvailable();
      return available ? "ollama" : null;
    }

    // Auto-détection : essayer Ollama d'abord, puis OpenAI
    const ollamaAvailable = await ollamaService.isAvailable();
    if (ollamaAvailable) {
      return "ollama";
    }

    if (openAIService.isConfigured()) {
      return "openai";
    }

    return null;
  }

  /**
   * Retourne le provider actuellement utilisé
   */
  async getCurrentProvider(): Promise<string> {
    const provider = await this.getProvider();
    return provider || "none";
  }
}

// Export d'une instance singleton
export const recipeAIService = new RecipeAIService();

// Export des services individuels pour usage direct si besoin
export { openAIService, ollamaService };

// Export par défaut
export default RecipeAIService;
