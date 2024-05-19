import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserForm, { UserDataProps } from "../components/userForm";

const LoginPage = () => {
  const API_URI = "http://localhost:3000";

  const [error, setError] = useState("");

  const fetchLogin = async (userData: UserDataProps) => {
    const { email, password } = userData;
    try {
      const bodyParameters = {
        email: email,
        password: password,
      };
      await axios
        .post(`${API_URI}/login`, bodyParameters)
        .then((res) => {
          localStorage.setItem("token", res.data.token);

          window.location.replace("/welcome");
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleSubmit = (userData: UserDataProps) => {
    setError("");
    fetchLogin(userData);
  };

  return (
    <div className="relative z-20 p-20 mx-auto bg-white rounded-lg shadow-lg w-full min-h-[560px] max-w-[560px]">
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="text-3xl" data-testid="login-text">
          Login to continue
        </h1>
        <UserForm onSubmit={handleSubmit} isLogin={true} />
        {error && <p className="pt-3 text-red-500">{error}</p>}
      </div>
      <div className="pt-5 flex gap-2 justify-center">
        <span>Don't have an account? </span>
        <Link className="underline text-red-400" to="/signup">
          Register here
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
