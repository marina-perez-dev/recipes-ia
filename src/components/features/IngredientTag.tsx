"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface IngredientTagProps {
  /**
   * Libellé de l'ingrédient affiché dans le tag.
   */
  label: string;

  /**
   * Callback appelée lors du clic sur le bouton de suppression.
   */
  onRemove?: () => void;

  /**
   * Libellé accessible personnalisé pour le bouton de suppression.
   */
  removeAriaLabel?: string;

  /**
   * Classes CSS supplémentaires pour personnaliser le style.
   */
  className?: string;
}

/**
 * Tag individuel représentant un ingrédient.
 * 
 */
export const IngredientTag: React.FC<IngredientTagProps> = ({
  label,
  onRemove,
  removeAriaLabel,
  className,
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-800 ring-1 ring-orange-200",
        className
      )}
    >
      <span className="truncate max-w-[8rem]" title={label}>
        {label}
      </span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex h-4 w-4 items-center justify-center rounded-full text-orange-500 hover:bg-orange-100 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-1"
          aria-label={
            removeAriaLabel ?? `Supprimer l'ingrédient ${label}`
          }
        >
          <span aria-hidden="true">&times;</span>
        </button>
      )}
    </span>
  );
};


