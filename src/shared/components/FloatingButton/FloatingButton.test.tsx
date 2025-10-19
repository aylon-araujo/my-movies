import { render, screen, fireEvent } from "@testing-library/react";
import FloatingButton from "./index";

jest.mock("react-icons/fa", () => ({
  FaArrowUp: () => <div data-testid="fa-arrow-up" />,
}));

const mockScrollTo = jest.fn();
Object.defineProperty(window, "scrollTo", {
  value: mockScrollTo,
  writable: true,
});

describe("FloatingButton", () => {
  beforeEach(() => {
    mockScrollTo.mockClear();
    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
    });
  });

  it("should render the button with correct aria-label", () => {
    render(<FloatingButton />);

    const button = screen.getByRole("button", { name: /voltar ao topo/i });
    expect(button).toBeInTheDocument();
  });

  it("should render the arrow icon", () => {
    render(<FloatingButton />);

    const icon = screen.getByTestId("fa-arrow-up");
    expect(icon).toBeInTheDocument();
  });

  it("should not be visible initially when scroll position is 0", () => {
    render(<FloatingButton />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("hidden");
    expect(button).not.toHaveClass("visible");
  });

  it("should become visible when scroll position exceeds 300px", () => {
    render(<FloatingButton />);

    const button = screen.getByRole("button");

    Object.defineProperty(window, "scrollY", { value: 400 });
    fireEvent.scroll(window);

    expect(button).toHaveClass("visible");
    expect(button).not.toHaveClass("hidden");
  });

  it("should call scrollTo with smooth behavior when clicked", () => {
    render(<FloatingButton />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("should hide when scrolling back to top", () => {
    render(<FloatingButton />);

    const button = screen.getByRole("button");

    Object.defineProperty(window, "scrollY", { value: 400 });
    fireEvent.scroll(window);
    expect(button).toHaveClass("visible");

    Object.defineProperty(window, "scrollY", { value: 100 });
    fireEvent.scroll(window);

    expect(button).toHaveClass("hidden");
    expect(button).not.toHaveClass("visible");
  });

  it("should add and remove scroll event listener", () => {
    const addEventListenerSpy = jest.spyOn(window, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = render(<FloatingButton />);

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it("should have correct CSS classes applied", () => {
    render(<FloatingButton />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("floatingButton");
    expect(button).toHaveClass("hidden");
  });
});
