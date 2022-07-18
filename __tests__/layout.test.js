import { render, screen } from "@testing-library/react";
import Layout from "../components/Layout";
import "@testing-library/jest-dom";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import "@testing-library/jest-dom";
// jest.mock("next-auth/react");


jest.mock("next-auth/react", () => {
    const originalModule = jest.requireActual('next-auth/react');
    const mockSession = {
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
      user: { email: "a" }
    };
    return {
      __esModule: true,
      ...originalModule,
      useSession: jest.fn(() => {
        return {data: mockSession, status: 'authenticated'}  // return type is [] in v3 but changed to {} in v4
      }),
    };
  });

describe("Layout", () => {
  it("renders layout", async () => {

    render(<Layout />);

    expect(screen.getByText("FindMyItem")).toBeInTheDocument();
    // expect(screen.getByText("Gallery")).toBeInTheDocument();
    // expect(screen.getByText("Noticeboard")).toBeInTheDocument();
    // expect(screen.getByText("Sign In")).toBeInTheDocument();
  });
});
