import Card from "@/components/Card";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Card", () => {
  it("correct date", () => {
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
    expect(screen.getByTestId("post_date")).toBeInTheDocument();
  });
});
