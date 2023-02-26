import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorMessage from "../components/ErrorMessage";

describe("ErrorMessage", () => {
  it("should render an error message", () => {
    // given
    const message = "Error Message";
    // when
    render(<ErrorMessage message={message} />);
    // then
    expect(screen.getByText("Error Message")).toBeInTheDocument();
  });
});
