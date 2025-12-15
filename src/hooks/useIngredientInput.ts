import { useCallback, useMemo, useState } from "react";

/**
 * Options de configuration pour le hook `useIngredientInput`.
 */
export interface UseIngredientInputOptions {
  /**
   * Liste contrôlée d'ingrédients.
   */
  value?: string[];

  /**
   * Valeur initiale lorsque le hook est utilisé en mode non contrôlé.
   * Ignoré si `value` est fourni.
   */
  initialIngredients?: string[];

  /**
   * Callback appelé à chaque fois que la liste d'ingrédients change.
   */
  onChange?: (ingredients: string[]) => void;

  /**
   * Nombre maximum d'ingrédients autorisés.
   * Si non défini, aucun maximum n'est appliqué.
   */
  maxIngredients?: number;
}

/**
 * Résultat retourné par le hook `useIngredientInput`.
 */
export interface UseIngredientInputResult {
  /**
   * Liste actuelle des ingrédients valides.
   */
  ingredients: string[];

  /**
   * Valeur de l'input texte en cours de saisie.
   */
  inputValue: string;

  /**
   * Message d'erreur courant (validation, doublons, etc.).
   */
  error: string | null;

  /**
   * Met à jour manuellement la valeur de l'input.
   */
  setInputValue: (value: string) => void;

  /**
   * Ajoute explicitement un ingrédient.
   *
   * Si `value` n'est pas fourni, la valeur de `inputValue` est utilisée.
   */
  addIngredient: (value?: string) => void;

  /**
   * Supprime un ingrédient de la liste.
   */
  removeIngredient: (ingredient: string) => void;

  /**
   * Gestionnaire de changement pour l'input texte.
   */
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;

  /**
   * Gestionnaire d'événement clavier pour l'input.
   * Ajoute l'ingrédient lors de l'appui sur Entrée.
   */
  handleInputKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => void;

  /**
   * Réinitialise le message d'erreur.
   */
  clearError: () => void;
}

/**
 * Hook personnalisé pour gérer un champ de saisie d'ingrédients avec tags.
 * 
 */
export function useIngredientInput(
  options: UseIngredientInputOptions = {}
): UseIngredientInputResult {
  const {
    value,
    initialIngredients = [],
    onChange,
    maxIngredients,
  } = options;

  const isControlled = value !== undefined;

  const [internalIngredients, setInternalIngredients] = useState<
    string[]
  >(initialIngredients);
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const ingredients = useMemo(
    () => (isControlled ? value ?? [] : internalIngredients),
    [isControlled, value, internalIngredients]
  );

  const updateIngredients = useCallback(
    (next: string[]) => {
      if (!isControlled) {
        setInternalIngredients(next);
      }
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  const validateIngredient = useCallback(
    (raw: string): string | null => {
      const trimmed = raw.trim();

      if (!trimmed) {
        return "L'ingrédient ne peut pas être vide.";
      }

      const normalized = trimmed.toLowerCase();
      const hasDuplicate = ingredients.some(
        (item) => item.toLowerCase() === normalized
      );

      if (hasDuplicate) {
        return "Cet ingrédient est déjà dans la liste.";
      }

      if (
        typeof maxIngredients === "number" &&
        maxIngredients > 0 &&
        ingredients.length >= maxIngredients
      ) {
        return `Vous ne pouvez pas ajouter plus de ${maxIngredients} ingrédients.`;
      }

      return null;
    },
    [ingredients, maxIngredients]
  );

  const addIngredient = useCallback(
    (rawValue?: string) => {
      const candidate = rawValue ?? inputValue;
      const errorMessage = validateIngredient(candidate);

      if (errorMessage) {
        setError(errorMessage);
        return;
      }

      const trimmed = candidate.trim();
      if (!trimmed) {
        return;
      }

      const next = [...ingredients, trimmed];
      updateIngredients(next);
      setInputValue("");
      setError(null);
    },
    [inputValue, ingredients, updateIngredients, validateIngredient]
  );

  const removeIngredient = useCallback(
    (ingredientToRemove: string) => {
      const next = ingredients.filter(
        (item) => item !== ingredientToRemove
      );
      updateIngredients(next);
      // On efface l'erreur potentielle liée au maximum ou au doublon.
      setError(null);
    },
    [ingredients, updateIngredients]
  );

  const handleInputChange: UseIngredientInputResult["handleInputChange"] =
    useCallback((event) => {
      setInputValue(event.target.value);
      if (error) {
        setError(null);
      }
    }, [error]);

  const handleInputKeyDown: UseIngredientInputResult["handleInputKeyDown"] =
    useCallback(
      (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          addIngredient();
        }
        if (
          event.key === "Backspace" &&
          !inputValue &&
          ingredients.length > 0
        ) {

          const last = ingredients[ingredients.length - 1];
          removeIngredient(last);
        }
      },
      [addIngredient, inputValue, ingredients, removeIngredient]
    );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    ingredients,
    inputValue,
    error,
    setInputValue,
    addIngredient,
    removeIngredient,
    handleInputChange,
    handleInputKeyDown,
    clearError,
  };
}


