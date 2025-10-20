import { act, renderHook } from "@testing-library/react";

import { useDebounce } from "./";

jest.useFakeTimers();

describe("useDebounce", () => {
  it("should return the initial value immediately", () => {
    const initialValue = "initial";
    const { result } = renderHook(() => useDebounce(initialValue, 500));

    expect(result.current).toBe(initialValue);
  });

  it("should delay value update by the specified delay time", () => {
    const delay = 500;
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "first", delay },
      }
    );
    expect(result.current).toBe("first");

    rerender({ value: "second", delay });
    expect(result.current).toBe("first");

    act(() => {
      jest.advanceTimersByTime(delay - 1);
    });
    expect(result.current).toBe("first");

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe("second");
  });

  it("should cancel the previous timer if the value changes before the delay expires", () => {
    const delay = 500;
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "one", delay },
      }
    );

    rerender({ value: "two", delay });

    act(() => {
      jest.advanceTimersByTime(delay / 2);
    });
    rerender({ value: "three", delay });
    expect(result.current).toBe("one");

    act(() => {
      jest.advanceTimersByTime(delay);
    });
    expect(result.current).toBe("three");
  });
});
