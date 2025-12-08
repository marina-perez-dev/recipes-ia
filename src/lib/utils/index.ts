import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utilitaire pour fusionner les classes CSS avec clsx et tailwind-merge
 * 
 * Permet de combiner des classes conditionnelles tout en résolvant
 * les conflits de classes Tailwind CSS.
 * 
 * @param inputs - Classes CSS à fusionner
 * @returns Chaîne de classes fusionnées
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

