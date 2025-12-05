export const metadata = {
  title: "À propos - Recipes IA",
  description: "En savoir plus sur Recipes IA",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">À propos</h1>
        <div className="prose prose-lg">
          <p className="text-gray-700 mb-4">
            Recipes IA est une application web qui génère des suggestions de
            recettes personnalisées basées sur les ingrédients que vous avez
            sous la main.
          </p>
          <p className="text-gray-700">
            Utilisez l&apos;intelligence artificielle pour découvrir de
            nouvelles recettes adaptées à vos ingrédients disponibles.
          </p>
        </div>
      </div>
    </div>
  );
}
