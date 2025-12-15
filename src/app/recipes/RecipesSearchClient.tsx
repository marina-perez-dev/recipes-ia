"use client";

import { useState } from "react";
import { IngredientInput } from "@/components/features/IngredientInput";

/**
 * Composant client pour la recherche de recettes.
 *
 * Gère l'état des ingrédients côté client et affiche le formulaire
 * ainsi qu'un placeholder de résultats.
 */
export function RecipesSearchClient() {
  const [ingredients, setIngredients] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Rechercher des recettes
          </h1>
          <p className="text-gray-600">
            Ajoutez les ingrédients que vous avez sous la main et découvrez
            des idées de recettes générées par l&apos;IA.
          </p>
        </header>

        <section className="mb-10 rounded-xl bg-white p-4 shadow-sm sm:p-6">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            Ingrédients disponibles
          </h2>
          <IngredientInput
            label="Ingrédients"
            helperText="Ajoutez un ingrédient puis appuyez sur Entrée. Vous pouvez en saisir plusieurs."
            value={ingredients}
            onChange={setIngredients}
            maxIngredients={15}
          />
        </section>

        <section aria-label="Résultats de recettes">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-gray-900">
              Résultats
            </h2>
            <p className="text-sm text-gray-500">
              {ingredients.length === 0
                ? "Ajoutez au moins un ingrédient pour démarrer la recherche."
                : `Recherche avec ${ingredients.length} ingrédient${
                    ingredients.length > 1 ? "s" : ""
                  }.`}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Placeholder en attendant l'intégration de l'API de recettes */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center text-gray-500">
              {ingredients.length === 0 ? (
                <p>
                  Aucune recette à afficher pour le moment. Ajoutez quelques
                  ingrédients pour voir apparaître des suggestions ici.
                </p>
              ) : (
                <p>
                  Les recettes basées sur vos ingrédients s&apos;afficheront
                  ici une fois l&apos;intégration avec l&apos;API terminée.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


