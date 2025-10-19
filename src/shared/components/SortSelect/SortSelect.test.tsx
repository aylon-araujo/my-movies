import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { SortOption } from "./types";
import SortSelect from "./index";

describe("SortSelect Component", () => {
  const mockOnSortChange = jest.fn();
  const user = userEvent.setup();

  const options = [
    { value: "title_asc" as SortOption, label: "Título (A-Z)" },
    { value: "title_desc" as SortOption, label: "Título (Z-A)" },
    { value: "rating_desc" as SortOption, label: "Nota (Maior)" },
    { value: "rating_asc" as SortOption, label: "Nota (Menor)" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the label "Ordenar por:"', () => {
    render(
      <SortSelect currentOption="title_asc" onSortChange={mockOnSortChange} />
    );

    expect(screen.getByLabelText("Ordenar por:")).toBeInTheDocument();
  });

  it("should render all sorting options", () => {
    render(
      <SortSelect currentOption="title_asc" onSortChange={mockOnSortChange} />
    );

    const select = screen.getByRole("combobox");
    expect(select.children.length).toBe(options.length);

    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("should display the correct initial option (title_asc)", () => {
    render(
      <SortSelect currentOption="title_asc" onSortChange={mockOnSortChange} />
    );

    const select = screen.getByRole("combobox") as HTMLSelectElement;

    expect(select.value).toBe("title_asc");
    expect(
      screen.getByRole("option", { name: "Título (A-Z)" })
    ).toBeInTheDocument();
  });

  it("should display the correct initial option (rating_desc)", () => {
    render(
      <SortSelect currentOption="rating_desc" onSortChange={mockOnSortChange} />
    );

    const select = screen.getByRole("combobox") as HTMLSelectElement;

    expect(select.value).toBe("rating_desc");
  });

  it("should call onSortChange with the new value when an option is selected", async () => {
    const initialOption = "title_asc";
    const newOptionValue = "rating_desc";
    const newOptionLabel = "Nota (Maior)";

    render(
      <SortSelect
        currentOption={initialOption}
        onSortChange={mockOnSortChange}
      />
    );

    const select = screen.getByRole("combobox");

    await user.selectOptions(select, newOptionLabel);

    expect(mockOnSortChange).toHaveBeenCalledTimes(1);
    expect(mockOnSortChange).toHaveBeenCalledWith(newOptionValue);
    expect(select).toHaveValue(initialOption);
  });

  it("should call onSortChange when selecting the second option (Título Z-A)", async () => {
    render(
      <SortSelect currentOption="title_asc" onSortChange={mockOnSortChange} />
    );

    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "Título (Z-A)");

    expect(mockOnSortChange).toHaveBeenCalledWith("title_desc");
  });
});
