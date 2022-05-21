import App from "../App";
import { render, fireEvent } from "@testing-library/react";

describe("<Characters />", () => {
  it("should display rick and morty characters", async () => {
    const { findByText } = render(<App />);
    expect(await findByText("Rick Sanchez")).toBeInTheDocument();
  });

  it("should go to the next page on button click", async () => {
    const { findByRole, findByText } = render(<App />);
    fireEvent.click(await findByRole("button", { name: /next/i }));
    expect(await findByText(/page: 2/i)).toBeInTheDocument();
    expect(await findByText("Aqua Morty")).toBeInTheDocument();
  });

  it("should filter characters on search", async () => {
    const { findByRole, findByText, queryByText } = render(<App />);
    fireEvent.change(await findByRole("textbox"), {
      target: { value: "morty" }
    });
    expect(await findByText("Morty Smith")).toBeInTheDocument();
    expect(await findByText("Alien Morty")).toBeInTheDocument();
    expect(await findByText("Antenna Morty")).toBeInTheDocument();
    expect(queryByText("Rick Sanchez")).toBeNull();
  });
});
