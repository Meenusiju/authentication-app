import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import axios from "axios";
import LoginPage from "../pages/LoginPage";

jest.mock("axios");

describe("LoginPage", () => {
  it("renders the login page correctly", () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );

    expect(screen.getByTestId("login-text")).toHaveTextContent(
      "Login to continue"
    );
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();
  });

  it("displays an error message on login failure", async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce({
      response: { data: { message: "Invalid credentials" } },
    });

    render(
      <Router>
        <LoginPage />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });
});
