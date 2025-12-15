import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IngredientInput } from "./IngredientInput";

describe("IngredientInput", () => {
  it("ajoute un tag quand on tape un ingrédient puis Entrée", async () => {
    const user = userEvent.setup();

    render(
      <IngredientInput
        label="Ingrédients"
        helperText="Aide"
      />
    );

    const input = screen.getByLabelText("Ingrédients");

    await user.type(input, "tomate");
    await user.keyboard("{Enter}");

    expect(
      screen.getByText("tomate")
    ).toBeInTheDocument();
  });

  it("supprime un tag quand on clique sur le bouton X", async () => {
    const user = userEvent.setup();

    render(
      <IngredientInput defaultValue={["tomate"]} />
    );

    const removeButton = screen.getByRole("button", {
      name: /supprimer l'ingrédient tomate/i,
    });

    await user.click(removeButton);

    expect(
      screen.queryByText("tomate")
    ).not.toBeInTheDocument();
  });

  it("affiche un message d'erreur lorsqu'on essaie d'ajouter un doublon", async () => {
    const user = userEvent.setup();

    render(
      <IngredientInput defaultValue={["tomate"]} />
    );

    const input = screen.getByRole("textbox");

    await user.type(input, "tomate");
    await user.keyboard("{Enter}");

    expect(
      screen.getByText("Cet ingrédient est déjà dans la liste.")
    ).toBeInTheDocument();
  });

  it("appelle onChange avec la liste à jour en mode contrôlé", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    function Wrapper() {
      const ingredients = ["tomate"];
      return (
        <IngredientInput
          value={ingredients}
          onChange={handleChange}
        />
      );
    }

    render(<Wrapper />);

    const input = screen.getByRole("textbox");

    await user.type(input, "fromage");
    await user.keyboard("{Enter}");

    expect(handleChange).toHaveBeenCalledWith([
      "tomate",
      "fromage",
    ]);
  });
});


