import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import Home from "../pages/Home";

describe("Home", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it("renders the home page correctly", () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    expect(screen.getByText("Hello World!")).toBeInTheDocument();
  });

  it("displays login and signup buttons when token is not present", () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    expect(
      screen.getByText("Login or signup to access the page.")
    ).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  it("does not display login and signup buttons when token is present", () => {
    localStorage.setItem("token", "fake-token");

    render(
      <Router>
        <Home />
      </Router>
    );

    expect(
      screen.queryByText("Login or signup to access the page.")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
    expect(screen.queryByText("Sign Up")).not.toBeInTheDocument();
  });
});
