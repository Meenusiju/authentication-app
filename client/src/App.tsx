import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import "./app.css";

const App: React.FC = () => {
  return (
    <div className="app  from-indigo-500">
      <Router>
        <div className="flex justify-center gap-6">
          <Link
            to="/"
            className="flex justify-center top-[100px] text-xl relative underline text-white "
          >
            Home
          </Link>

          <Link
            to="/welcome"
            className="flex justify-center top-[100px] text-xl relative underline text-white "
          >
            App
          </Link>
        </div>

        <div className="flex items-center h-screen overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/welcome" element={<Welcome />} />

            <Route path="/login" element={<LoginPage />} />

            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
