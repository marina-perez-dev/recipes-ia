# Architecture du Projet - Recipes IA

## Vue d'ensemble

Ce document décrit l'architecture et l'organisation du code du projet Recipes IA. 
Il définit la structure des dossiers, les conventions de nommage et les principes d'organisation.

## 📋 Table des matières

1. [Structure des dossiers](#structure-des-dossiers)
2. [Organisation des composants](#organisation-des-composants)
3. [Services et utilitaires](#services-et-utilitaires)
4. [Types et interfaces](#types-et-interfaces)
5. [Conventions de nommage](#conventions-de-nommage)
6. [Flux de données](#flux-de-données)

---

## Structure des dossiers

```
src/
├── app/                    # Routes Next.js (App Router)
│   ├── layout.tsx         # Layout racine
│   ├── page.tsx           # Page d'accueil
│   ├── recipes/           # Route /recipes
│   │   └── page.tsx
│   ├── about/             # Route /about
│   │   └── page.tsx
│   └── globals.css        # Styles globaux
│
├── components/            # Composants React
│   ├── ui/                # Composants UI réutilisables
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── index.ts       # Export centralisé
│   │
│   ├── features/          # Composants spécifiques aux features
│   │                      
│   │
│   └── layout/            # Composants de mise en page
│       ├── Navigation.tsx
│       └── index.ts       # Export centralisé
│
├── lib/                   # Bibliothèques et utilitaires
│   ├── api/               # Services API
│   │   ├── index.ts      # Export centralisé
│   │   ├── openai.ts     # Service OpenAI
│   │   ├── ollama.ts     # Service Ollama
│   │   └── types.ts      # Types API
│   │
│   ├── utils/             # Utilitaires
│   │   └── index.ts      # Fonctions utilitaires (cn, etc.)
│   │
│   └── hooks/             # Custom hooks React
│                          
│
├── types/                 # Types TypeScript globaux
│                           # Types partagés dans toute l'application
│
└── styles/                # Styles globaux
    └── design-tokens.css  # Tokens de design
```

---

## Organisation des composants

### Composants UI (`components/ui/`)

**Rôle** : Composants réutilisables et génériques, indépendants du domaine métier.

**Caractéristiques** :
- Aucune dépendance métier
- Hautement réutilisables
- Documentés avec JSDoc
- Accessibles (ARIA, keyboard navigation)
- Support du mode sombre


**Import** :
```tsx
import { Button, Card } from "@/components/ui";
```

### Composants Features (`components/features/`)

**Rôle** : Composants liés à des fonctionnalités spécifiques de l'application.

**Caractéristiques** :
- Dépendent du domaine métier (recettes, ingrédients)
- Peuvent utiliser des composants UI
- Peuvent utiliser des hooks personnalisés
- Peuvent utiliser des services API

**Convention de nommage** : PascalCase, nom descriptif de la feature

### Composants Layout (`components/layout/`)

**Rôle** : Composants de structure et de mise en page globale.

**Caractéristiques** :
- Structure de la page (header, footer, sidebar)
- Navigation
- Wrappers de layout

**Import** :
```tsx
import { Navigation } from "@/components/layout";
```

---

## Services et utilitaires

### Services API (`lib/api/`)

**Rôle** : Communication avec les APIs externes (OpenAI, Ollama).

**Structure** :
- Un fichier par service API
- Types partagés dans `types.ts`
- Export centralisé via `index.ts`

### Utilitaires (`lib/utils/`)

**Rôle** : Fonctions utilitaires réutilisables.

### Custom Hooks (`lib/hooks/`)

**Rôle** : Logique réutilisable encapsulée dans des hooks React.

**Convention de nommage** : Préfixe `use` (ex: `useRecipe`, `useApi`)

---

## Types et interfaces

### Types globaux (`types/`)

**Rôle** : Types TypeScript partagés dans toute l'application.

**Organisation** :
- Un fichier par domaine (ex: `recipe.ts`, `api.ts`)
- Types génériques dans `common.ts`

---

## Conventions de nommage

### Fichiers

- **Composants** : PascalCase (`Button.tsx`, `RecipeCard.tsx`)
- **Hooks** : camelCase avec préfixe `use` (`useRecipe.ts`)
- **Utilitaires** : camelCase (`formatDate.ts`)
- **Types** : camelCase (`recipe.ts`, `api.ts`)
- **Pages Next.js** : `page.tsx`, `layout.tsx`, `loading.tsx`

### Variables et fonctions

- **Composants** : PascalCase (`const Button = () => {}`)
- **Fonctions** : camelCase (`const formatDate = () => {}`)
- **Constantes** : UPPER_SNAKE_CASE (`const API_BASE_URL = ""`)
- **Types/Interfaces** : PascalCase (`interface Recipe {}`)

### Dossiers

- **Composants** : kebab-case ou PascalCase (`recipe-card/` ou `RecipeCard/`)
- **Autres** : kebab-case (`lib/`, `types/`)

---

## Flux de données

### Appels API

```
Composant Feature
    ↓
Custom Hook (useRecipe, useApi)
    ↓
Service API (lib/api/)
    ↓
API Externe (OpenAI, Ollama)
```

### Gestion d'état

- **État local** : `useState`, `useReducer`
- **État serveur** : Next.js Server Components + API Routes
- **État global** : Context API (si nécessaire)
- **Cache** : React Query ou SWR (si nécessaire)

---

## Principes d'architecture

### Séparation des responsabilités

- **UI** : Présentation uniquement
- **Features** : Logique métier spécifique
- **Hooks** : Logique réutilisable
- **Services** : Communication externe
- **Types** : Contrats de données

### Réutilisabilité

- Composants UI : Maximum de réutilisabilité
- Hooks : Logique partagée
- Utilitaires : Fonctions pures

### Maintenabilité

- Structure claire et prévisible
- Documentation (JSDoc)
- Types TypeScript stricts
- Tests unitaires (à venir)

### Scalabilité

- Organisation par feature possible
- Facile d'ajouter de nouveaux composants
- Structure extensible

---

## Évolutions futures

### Possibles améliorations

1. **Tests** : Ajout de tests unitaires et d'intégration
2. **Storybook** : Documentation visuelle des composants UI
3. **State Management** : Ajout de Zustand ou Redux si nécessaire
4. **Internationalisation** : Support multi-langues
5. **Performance** : Optimisations (lazy loading, code splitting)

---
