"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Variantes du bouton
 */
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

/**
 * Tailles du bouton
 */
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Variante visuelle du bouton
   * @default "primary"
   */
  variant?: ButtonVariant;
  /**
   * Taille du bouton
   * @default "md"
   */
  size?: ButtonSize;
  /**
   * Afficher un état de chargement
   * @default false
   */
  isLoading?: boolean;
  /**
   * Rendre le bouton pleine largeur
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Contenu du bouton
   */
  children: React.ReactNode;
}

/**
 * Composant Button - Bouton réutilisable avec plusieurs variantes
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Cliquer ici
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantStyles = {
      primary:
        "bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500",
      secondary:
        "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
      outline:
        "border-2 border-orange-600 text-orange-600 hover:bg-orange-50 focus:ring-orange-500 dark:border-orange-500 dark:text-orange-500 dark:hover:bg-orange-950",
      ghost:
        "text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800",
      danger:
        "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    };

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

