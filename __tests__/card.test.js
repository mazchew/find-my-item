import Card from "@/components/Card";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import moment from "moment";

describe("Card", () => {
  beforeEach(() => {
    render(
      <Card
        id="1"
        image="/public/backpack.jpg"
        title="Backpack"
        location="Central Library"
        category="BAG"
        createdAt="2022-07-02 12:30:01.01"
      />
    );
  });

  it("correct date", () => {
    expect(screen.getByTestId("post_date")).toBeInTheDocument();
    expect(screen.getByTestId("post_date").textContent).toBe(
      moment("2022-07-02 12:30:01.01").fromNow()
    );
  });
  it("Correct location", () => {
    expect(screen.getByTestId("location")).toBeInTheDocument();
    expect(screen.getByTestId("location").textContent).toBe("Central Library");
  });
  it("Correct category", () => {
    expect(screen.getByTestId("category")).toBeInTheDocument();
    expect(screen.getByTestId("category").textContent).toBe("BAG");
  });

  it("Correct title", () => {
    expect(screen.getByTestId("title")).toBeInTheDocument();
    expect(screen.getByTestId("title").textContent).toBe("Backpack");
  });
  // it("Correct image source", () => {
  //   const img = screen.getByAltText("Backpack");
  //   expect(img.getAttribute("src")).toBe("/public/backpack.jpg");
  // });
});
