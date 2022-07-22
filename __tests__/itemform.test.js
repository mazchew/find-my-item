import { render, screen, waitFor, within } from "@testing-library/react";
import ItemForm from "@/components/ItemForm";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom";

describe("Item Form", () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    onSubmit.mockClear();
    render(<ItemForm onSubmit={onSubmit} />);
  });

  it("onSubmit is called when all fields pass validation", async () => {
    user.type(getTitle(), "Backpack");
    user.type(getLocation(), "Central Library");
    user.type(
      getDescription(),
      "Blue back pack found In central library with $500 inside."
    );
    user.selectOptions(
      getDropdown(),
      within(getDropdown()).getByRole("option", { name: "Bag" })
    );
    clickSubmit();

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        category: "BAG",
        description: "B",
        image: "",
        location: "C",
        title: "B",
      });
    });
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("has 4 required fields", async () => {
    clickSubmit();

    waitFor(() => {
      expect(screen.getByText("title is a required field")).toBeInTheDocument();
    });
  });
});

function getTitle() {
  return screen.getByRole("textbox", {
    name: /title/i,
  });
}

function getLocation() {
  return screen.getByRole("textbox", {
    name: /location/i,
  });
}

function getDescription() {
  return screen.getByRole("textbox", {
    name: /description/i,
  });
}

function getDropdown() {
  return screen.getByRole("combobox", {
    name: /category/i,
  });
}

function clickSubmit() {
  user.click(
    screen.getByRole("button", {
      name: /submit/i,
    })
  );
}
