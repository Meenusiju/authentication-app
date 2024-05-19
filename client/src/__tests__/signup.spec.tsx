import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import axios from "axios";
import SignupPage from "../pages/SignupPage";

jest.mock("axios");

describe("SignupPage", () => {
  beforeEach(() => {
    jest.spyOn(localStorage, "setItem");
  });

  it("renders the signup page correctly", () => {
    render(
      <Router>
        <SignupPage />
      </Router>
    );

    expect(screen.getByTestId("login-text")).toHaveTextContent(
      "Sign up to register"
    );
    expect(screen.getByPlaceholderText("Enter name name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();
  });

  it("displays an error message for invalid password", async () => {
    render(
      <Router>
        <SignupPage />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter name name"), {
      target: { value: "TestUser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "invalid" },
    });

    fireEvent.click(screen.getByText("Signup"));

    await waitFor(() => {
      expect(
        screen.getByText(
          "Password must be at least 8 characters long. Please include at least one lowercase letter, one uppercase letter, one number, and one special character."
        )
      ).toBeInTheDocument();
    });
  });

  it("displays an error message on signup failure", async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce({
      response: { data: { message: "Signup failed" } },
    });

    render(
      <Router>
        <SignupPage />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter name name"), {
      target: { value: "TestUser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "Password123!" },
    });

    fireEvent.click(screen.getByText("Signup"));

    await waitFor(() => {
      expect(screen.getByText("Signup failed")).toBeInTheDocument();
    });
  });
});
