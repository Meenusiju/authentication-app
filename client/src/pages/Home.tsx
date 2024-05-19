import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const token = localStorage.getItem("token");
  return (
    <div className="relative z-20 p-20 mx-auto w-full bg-white rounded-lg shadow-lg min-h-[560px] max-w-[560px]">
      <div className="flex gap-10 flex-col">
        <h1 className="text-3xl">Hello World! </h1>

        {!token && (
          <>
            <h1 className="text-xl">Login or signup to access the page.</h1>
            <Link to="/login">
              <button className="px-4 py-2 w-full bg-indigo-500 text-white rounded-md focus:outline-none">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-4 py-2 w-full bg-indigo-500 text-white rounded-md focus:outline-none">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
