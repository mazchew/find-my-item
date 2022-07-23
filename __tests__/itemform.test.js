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
    await user.type(getTitle(), "Backpack");
    await user.type(getLocation(), "Central Library");
    await user.type(
      getDescription(),
      "Blue back pack found In central library with $500 inside."
    );
    await user.selectOptions(
      getDropdown(),
      within(getDropdown()).getByRole("option", { name: "Bag" })
    );
    clickSubmit();

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        category: "BAG",
        description:
          "Blue back pack found In central library with $500 inside.",
        image: "",
        location: "Central Library",
        title: "Backpack",
      });
    });
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("has 4 required fields", async () => {
    clickSubmit();

    await waitFor(() => {
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
