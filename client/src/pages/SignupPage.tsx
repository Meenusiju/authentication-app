import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserForm, { UserDataProps } from "../components/userForm";

const SignupPage = () => {
  const API_URI = "http://localhost:3000";
  const [error, setError] = useState("");

  const fetchSignup = async (userData: UserDataProps) => {
    try {
      const { username, email, password } = userData;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

      if (!passwordRegex.test(password)) {
        setError(
          "Password must be at least 8 characters long. Please include at least one lowercase letter, one uppercase letter, one number, and one special character."
        );
        return;
      }
      const bodyParameters = {
        username: username,
        email: email,
        password: password,
      };
      await axios
        .post(`${API_URI}/signup`, bodyParameters)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          window.location.replace("/welcome");
        })

        .catch((err) => {
          setError(err.response.data.message);
        });
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const handleSubmit = (userData: UserDataProps) => {
    setError("");
    fetchSignup(userData);
  };

  return (
    <div className="relative z-20 p-20 mx-auto w-full bg-white rounded-lg shadow-lg min-h-[560px] max-w-[560px]">
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="text-3xl" data-testid="login-text">
          Sign up to register
        </h1>
        <UserForm onSubmit={handleSubmit} isLogin={false} />
        {error && <p className="pt-3 text-red-500">{error}</p>}
      </div>
      <div className="pt-5 flex gap-2 justify-center">
        <span>Already have an account? </span>
        <Link className="underline text-red-400" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
