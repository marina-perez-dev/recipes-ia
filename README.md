This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Outils de Qualité de Code

Ce projet utilise **ESLint** et **Prettier** pour garantir la qualité et la cohérence du code.

### ESLint

[ESLint](https://eslint.org/) est configuré avec les règles recommandées de Next.js pour détecter les erreurs et problèmes potentiels dans le code.

**Commandes disponibles :**

```bash
npm run lint        # Vérifie le code avec ESLint
npm run lint:fix    # Corrige automatiquement les erreurs ESLint
```

### Prettier

[Prettier](https://prettier.io/) est configuré pour formater automatiquement le code selon des standards cohérents, garantissant un style uniforme dans tout le projet.

**Commandes disponibles :**

```bash
npm run format        # Formate tout le code avec Prettier
npm run format:check  # Vérifie le formatage sans modifier les fichiers
```

### Configuration

- **ESLint** : Configuration dans `eslint.config.mjs` avec `eslint-config-next` et `eslint-config-prettier` pour éviter les conflits
- **Prettier** : Configuration dans `.prettierrc` avec règles personnalisées
- Les deux outils sont intégrés pour fonctionner ensemble sans conflit

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
