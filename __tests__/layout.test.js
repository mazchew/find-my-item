import { render, screen } from "@testing-library/react";
import Layout from "../components/Layout";
import "@testing-library/jest-dom";
import React from "react";
import client, { Session } from "next-auth/client";
import "@testing-library/jest-dom";
import { AccessProvider } from "faunadb";
jest.mock("next-auth/client")

describe("Layout", () => {
    it("renders layout", async () => {

        const mockSession = {
            expires: "1000000",
            user: {email: "a", }
        };
        (client.useSession).mockReturnValueOnce([mockSession, false]);
        
        render(<Layout/>);

        expect(screen.getByTestId("title")).toBeInTheDocument();
        expect(screen.getByTestId("gallery")).toBeInTheDocument();
        expect(screen.getByTestId("noticeboard")).toBeInTheDocument();
        expect(screen.getByTestId("signin")).toBeInTheDocument();

    });



});