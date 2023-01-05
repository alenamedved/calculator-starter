import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";

import Calculator from "../../components/Calculator";
import { strictEqual } from "assert";

describe("Calculator component testing", () => {
  render(<Calculator />);
  it("has all the fields", () => {
    expect(document.getElementById("first")).toBeInTheDocument();
    expect(document.getElementById("second")).toBeInTheDocument();
    expect(document.getElementById("operation")).toBeInTheDocument();
    expect(document.querySelector("button[type=submit]")).toBeInTheDocument();
  });
});

describe("test functionality", () => {
  it("user is able to input values", async () => {
    render(<Calculator />);
    //simulate input
    const firstInput: HTMLInputElement = screen.getByLabelText("First Number");
    userEvent.type(firstInput, "3");
    expect(firstInput.value).toBe("3");

    //simulate input
    const secondInput: HTMLInputElement =
      screen.getByLabelText("Second Number");
    userEvent.type(secondInput, "5");
    expect(secondInput.value).toBe("5");

    //Simulate selecting an option and verifying its value
    const select = screen.getByRole("combobox");
    expect(
      await screen.findByRole("option", { name: "+" })
    ).toBeInTheDocument();
    userEvent.selectOptions(select, "add");
    expect(select).toHaveValue("add");
  });
});
