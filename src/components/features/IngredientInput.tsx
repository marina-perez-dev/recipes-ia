"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { IngredientTag } from "./IngredientTag";
import {
  useIngredientInput,
  type UseIngredientInputOptions,
} from "@/hooks/useIngredientInput";

export interface IngredientInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange"
  > {
  /**
   * Liste contrôlée d'ingrédients.
   */
  value?: string[];

  /**
   * Liste d'ingrédients initiale en mode non contrôlé.
   */
  defaultValue?: string[];

  /**
   * Callback appelée à chaque modification de la liste d'ingrédients.
   */
  onChange?: UseIngredientInputOptions["onChange"];

  /**
   * Libellé du champ (affiché au-dessus de l'input).
   */
  label?: string;

  /**
   * Texte d'aide facultatif affiché sous le champ.
   */
  helperText?: string;

  /**
   * Nombre maximum d'ingrédients autorisés.
   */
  maxIngredients?: number;

  /**
   * Message d'erreur externe (prioritaire sur l'erreur interne).
   */
  error?: string;
}

/**
 * Composant de formulaire permettant de saisir plusieurs ingrédients
 * via un système de tags.
 */
export const IngredientInput: React.FC<IngredientInputProps> = ({
  value,
  defaultValue,
  onChange,
  label,
  placeholder,
  helperText,
  maxIngredients,
  error: externalError,
  disabled,
  id,
  name,
  className,
  ...inputProps
}) => {
  const {
    ingredients,
    inputValue,
    error: internalError,
    handleInputChange,
    handleInputKeyDown,
    removeIngredient,
  } = useIngredientInput({
    value,
    initialIngredients: defaultValue,
    onChange,
    maxIngredients,
  });

  const hasError = Boolean(externalError ?? internalError);
  const errorMessage = externalError ?? internalError;

  const inputId = id ?? name ?? "ingredient-input";
  const helperId = helperText
    ? `${inputId}-helper`
    : undefined;
  const errorId = hasError ? `${inputId}-error` : undefined;

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-gray-800"
        >
          {label}
        </label>
      )}

      <div
        className={cn(
          "flex min-h-[48px] w-full flex-wrap items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm shadow-sm transition-colors focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20",
          hasError &&
            "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/20",
          disabled && "bg-gray-100 opacity-70"
        )}
      >
        {ingredients.map((ingredient) => (
          <IngredientTag
            key={ingredient}
            label={ingredient}
            onRemove={
              disabled
                ? undefined
                : () => removeIngredient(ingredient)
            }
          />
        ))}

        <input
          id={inputId}
          name={name}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          disabled={disabled}
          placeholder={
            placeholder ??
            "Ajoutez un ingrédient et appuyez sur Entrée"
          }
          className={cn(
            "flex-1 min-w-[120px] border-0 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0",
            "disabled:cursor-not-allowed disabled:text-gray-400"
          )}
          aria-invalid={hasError || undefined}
          aria-describedby={
            [helperId, errorId].filter(Boolean).join(" ") ||
            undefined
          }
          {...inputProps}
        />
      </div>

      <div className="flex flex-col gap-0.5">
        {helperText && (
          <p
            id={helperId}
            className="text-xs text-gray-500"
          >
            {helperText}
          </p>
        )}
        {hasError && (
          <p
            id={errorId}
            className="text-xs text-red-600"
          >
            {errorMessage}
          </p>
        )}
        {typeof maxIngredients === "number" &&
          maxIngredients > 0 && (
            <p className="text-xs text-gray-400">
              {ingredients.length}/{maxIngredients} ingrédients
            </p>
          )}
      </div>
    </div>
  );
};


