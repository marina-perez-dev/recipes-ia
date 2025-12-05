export const metadata = {
  title: "Recettes - Recipes IA",
  description: "Découvrez vos recettes personnalisées",
};

export default function RecipesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Mes Recettes</h1>
        <p className="text-gray-600 mb-8">
          Voici vos suggestions de recettes personnalisées
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Liste des recettes à implémenter */}
          <p className="text-gray-500">Aucune recette pour le moment</p>
        </div>
      </div>
    </div>
  );
}
