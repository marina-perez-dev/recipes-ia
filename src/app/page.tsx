import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Recipes IA</h1>
        <p className="text-xl text-gray-700 mb-8">
          Découvrez des recettes personnalisées basées sur vos ingrédients
        </p>
        <Link
          href="/recipes"
          className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
        >
          Commencer
        </Link>
      </div>
    </div>
  );
}
