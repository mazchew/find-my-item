import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import "@testing-library/jest-dom";

describe("Home", () => {
    it("renders layout", () => {
        render(<Home/>);

        expect(screen.getByTestId("title")).toBeInTheDocument();
        expect(screen.getByTestId("gallery")).toBeInTheDocument();
        expect(screen.getByTestId("noticeboard")).toBeInTheDocument();
        expect(screen.getByTestId("signin")).toBeInTheDocument();

    })



})