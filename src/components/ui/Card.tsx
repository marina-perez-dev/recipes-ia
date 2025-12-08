"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Afficher une ombre sur la carte
   * @default true
   */
  shadow?: boolean;
  /**
   * Afficher une bordure
   * @default true
   */
  bordered?: boolean;
  /**
   * Rendre la carte cliquable (ajoute un effet hover)
   * @default false
   */
  clickable?: boolean;
  /**
   * Contenu de la carte
   */
  children: React.ReactNode;
}

/**
 * Composant Card - Conteneur de contenu avec style cohérent
 *
 * @example
 * ```tsx
 * <Card shadow bordered>
 *   <h3>Titre</h3>
 *   <p>Contenu de la carte</p>
 * </Card>
 * ```
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      shadow = true,
      bordered = true,
      clickable = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl bg-white dark:bg-gray-800",
          shadow && "shadow-md",
          bordered && "border border-gray-200 dark:border-gray-700",
          clickable &&
            "transition-all cursor-pointer hover:shadow-lg hover:scale-[1.02]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

/**
 * Composant CardHeader - En-tête de la carte
 */
export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("px-6 py-4 border-b border-gray-200 dark:border-gray-700", className)}
      {...props}
    />
  );
});

CardHeader.displayName = "CardHeader";

/**
 * Composant CardTitle - Titre de la carte
 */
export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn(
        "text-xl font-semibold text-gray-900 dark:text-gray-100",
        className
      )}
      {...props}
    />
  );
});

CardTitle.displayName = "CardTitle";

/**
 * Composant CardContent - Contenu principal de la carte
 */
export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("px-6 py-4", className)}
      {...props}
    />
  );
});

CardContent.displayName = "CardContent";

/**
 * Composant CardFooter - Pied de la carte
 */
export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "px-6 py-4 border-t border-gray-200 dark:border-gray-700",
        className
      )}
      {...props}
    />
  );
});

CardFooter.displayName = "CardFooter";

