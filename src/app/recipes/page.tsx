export const metadata = {
  title: "Recettes - Recipes IA",
  description: "Découvrez vos recettes personnalisées",
};

export default function RecipesPage() {
  return (
    // On délègue la logique client (hooks, interactions) à un composant client dédié.
    // Cela permet de conserver `metadata` côté serveur tout en utilisant un composant client.
    <RecipesSearchClientWrapper />
  );
}

/**
 * Petit wrapper qui importe le composant client sans utiliser `require`.
 * Cette fonction reste compatible avec le rendu côté serveur.
 */
async function RecipesSearchClientWrapper() {
  const { RecipesSearchClient } = await import("./RecipesSearchClient");
  return <RecipesSearchClient />;
}
