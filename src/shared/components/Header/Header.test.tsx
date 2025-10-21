import { MemoryRouter, useLocation } from "react-router-dom";

import { MainRoutes } from "@app/routes/Main/routes";
import { fireEvent, render, screen } from "@testing-library/react";

import type { ButtonProps } from "../Button/Button.types";
import type { InputSearchProps } from "../InputSearch/InputSearch.types";
import { Header } from "./";

const mockUseSearchSync = jest.fn();
jest.mock("@features/movies/hooks/useSearchSync", () => ({
  useSearchSync: () => mockUseSearchSync(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

jest.mock("../Button", () => ({
  Button: ({ onClick, variant, children }: ButtonProps) => (
    <button
      data-testid={`button-${children}`}
      onClick={onClick}
      className={variant}
    >
      {children}
    </button>
  ),
}));

jest.mock("../InputSearch", () => ({
  InputSearch: ({ value, onInputChange }: InputSearchProps) => (
    <input
      data-testid="input-search"
      value={value}
      onChange={onInputChange}
      placeholder="Search..."
    />
  ),
}));

describe("Header Component", () => {
  const searchTerm = "Action";
  const setSearchTerm = jest.fn();
  const handleNavigationClick = jest.fn();

  const renderHeader = (initialPath: string = MainRoutes.HOME) => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: initialPath });
    mockUseSearchSync.mockReturnValue({
      searchTerm,
      setSearchTerm,
      handleNavigationClick,
    });

    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <Header />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render the Header correctly", () => {
    renderHeader();

    expect(screen.getByText("MovieDB")).toBeInTheDocument();

    const searchInput = screen.getByTestId("input-search");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue(searchTerm);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Favoritos")).toBeInTheDocument();
  });


  describe("Search Functionality (InputSearch)", () => {
    test("should call setSearchTerm when typing into InputSearch", () => {
      renderHeader();
      const searchInput = screen.getByTestId("input-search");
      const newSearchTerm = "Horror";

      fireEvent.change(searchInput, { target: { value: newSearchTerm } });

      expect(setSearchTerm).toHaveBeenCalledWith(newSearchTerm);
    });
  });


  describe("Navigation and Button Styling", () => {
    test('should apply "primary" variant to the Home button when the route is HOME', () => {
      renderHeader(MainRoutes.HOME);
      const homeButton = screen.getByTestId("button-Home");
      const favoritesButton = screen.getByTestId("button-Favoritos");

      expect(homeButton).toHaveClass("primary");
      expect(favoritesButton).toHaveClass("ghost");
    });

    test('should apply "primary" variant to the Favorites button when the route is FAVORITES_MOVIES', () => {
      renderHeader(MainRoutes.FAVORITES_MOVIES);
      const homeButton = screen.getByTestId("button-Home");
      const favoritesButton = screen.getByTestId("button-Favoritos");

      expect(homeButton).toHaveClass("ghost");
      expect(favoritesButton).toHaveClass("primary");
    });

    test('should apply "primary" variant to the Favorites button on FAVORITES_MOVIES sub-routes', () => {
      renderHeader(`${MainRoutes.FAVORITES_MOVIES}/123`);
      const favoritesButton = screen.getByTestId("button-Favoritos");

      expect(favoritesButton).toHaveClass("primary");
    });

    test("should call handleNavigationClick when clicking the logo", () => {
      renderHeader();

      fireEvent.click(screen.getByText("MovieDB"));

      expect(handleNavigationClick).toHaveBeenCalledWith(MainRoutes.HOME);
    });

    test("should call handleNavigationClick when clicking the Home button", () => {
      renderHeader();

      fireEvent.click(screen.getByText("Home"));

      expect(handleNavigationClick).toHaveBeenCalledWith(MainRoutes.HOME);
    });

    test("should call handleNavigationClick when clicking the Favorites button", () => {
      renderHeader();

      fireEvent.click(screen.getByText("Favoritos"));

      expect(handleNavigationClick).toHaveBeenCalledWith(
        MainRoutes.FAVORITES_MOVIES
      );
    });
  });
});
