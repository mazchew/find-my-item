import { render, screen, waitFor, within } from "@testing-library/react";
import ContactForm from "@/components/ContactForm";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom";

describe("Contact Form", () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    onSubmit.mockClear();
    render(<ContactForm onSubmit={onSubmit} buttonText="Contact Poster" />);
  });

  it("Empty input", async () => {
    clickSubmit();

    await waitFor(() => {
      expect(
        screen.getByText("message is a required field")
      ).toBeInTheDocument();
    });
  });

  it("More than 200 characters", async () => {
    await user.type(getMessage(), LongMessage());
    clickSubmit();

    await waitFor(() => {
      expect(
        screen.getByText("message must be at most 200 characters")
      ).toBeInTheDocument();
    });
  });

  it("Less than 200 characters", async () => {
    await user.type(getMessage(), shortMessage());
    clickSubmit();

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        message: shortMessage(),
      });
    });
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});

function getMessage() {
  return screen.getByRole("textbox", {
    name: /message/i,
  });
}

function clickSubmit() {
  user.click(
    screen.getByRole("button", {
      name: /contact poster/i,
    })
  );
}

function LongMessage() {
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut leo ornare, imperdiet nibh id, dapibus neque. Aliquam congue rhoncus tellus, ac aliquam nisl ultrices eu. Quisque vestibulum eu nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut leo ornare, imperdiet nibh id, dapibus neque. Aliquam congue rhoncus tellus, ac aliquam nisl ultrices eu. Quisque vestibulum eu nunc.";
}

function shortMessage() {
  return "Hello, this is my lost wallet with IC TXXXX123A and you can contact me on telegram, my handle is @abc123.";
}
