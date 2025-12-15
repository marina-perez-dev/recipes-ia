import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import {
  useIngredientInput,
  type UseIngredientInputOptions,
} from "./useIngredientInput";

function setup(options?: UseIngredientInputOptions) {
  return renderHook(() => useIngredientInput(options));
}

describe("useIngredientInput", () => {
  it("ajoute un ingrédient valide et nettoie l'input", () => {
    const { result } = setup();

    act(() => {
      result.current.addIngredient("tomate");
    });

    expect(result.current.ingredients).toEqual(["tomate"]);
    expect(result.current.inputValue).toBe("");
    expect(result.current.error).toBeNull();
  });

  it("refuse les ingrédients vides", () => {
    const { result } = setup();

    act(() => {
      result.current.addIngredient("   ");
    });

    expect(result.current.ingredients).toEqual([]);
    expect(result.current.error).toBe("L'ingrédient ne peut pas être vide.");
  });

  it("refuse les doublons insensibles à la casse", () => {
    const { result } = setup({
      initialIngredients: ["Tomate"],
    });

    act(() => {
      result.current.addIngredient("tomate");
    });

    expect(result.current.ingredients).toEqual(["Tomate"]);
    expect(result.current.error).toBe(
      "Cet ingrédient est déjà dans la liste."
    );
  });

  it("respecte la limite maxIngredients", () => {
    const { result } = setup({
      initialIngredients: ["a", "b"],
      maxIngredients: 2,
    });

    act(() => {
      result.current.addIngredient("c");
    });

    expect(result.current.ingredients).toEqual(["a", "b"]);
    expect(result.current.error).toBe(
      "Vous ne pouvez pas ajouter plus de 2 ingrédients."
    );
  });

  it("supprime le dernier ingrédient avec Backspace sur input vide", () => {
    const { result } = setup({
      initialIngredients: ["tomate", "fromage"],
    });

    act(() => {
      result.current.handleInputKeyDown({
        key: "Backspace",
      } as React.KeyboardEvent<HTMLInputElement>);
    });

    expect(result.current.ingredients).toEqual(["tomate"]);
  });

  it("appelle onChange en mode contrôlé", () => {
    const handleChange = vi.fn();
    const { result, rerender } = renderHook<
      ReturnType<typeof useIngredientInput>,
      UseIngredientInputOptions
    >(
      (props) => useIngredientInput(props),
      {
        initialProps: {
          value: [],
          onChange: handleChange,
        },
      }
    );

    act(() => {
      result.current.addIngredient("tomate");
    });

    expect(handleChange).toHaveBeenCalledWith(["tomate"]);

    // Le hook contrôlé reflète la nouvelle valeur depuis l'extérieur
    rerender({
      value: ["tomate"],
      onChange: handleChange,
    });

    expect(result.current.ingredients).toEqual(["tomate"]);
  });
});


