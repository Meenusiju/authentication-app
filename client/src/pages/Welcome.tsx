import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../components/modal";

export const Welcome = () => {
  const [userName, setUserName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const API_URI = "http://localhost:3000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const tokenObj = JSON.parse(atob(token.split(".")[1]));
      setUserId(tokenObj.id);
      fetchUserName(tokenObj.id);
    }
  }, [token]);

  const fetchUserName = async (userId: string) => {
    try {
      const res = await axios.get(`${API_URI}/user/${userId}`);
      setUserName(res.data.user.username);
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleUsernameUpdate = (newUsername: string) => {
    setUserName(newUsername);
  };

  return (
    <div className="relative z-20 p-20 mx-auto bg-white rounded-lg shadow-lg w-full min-h-[560px] max-w-[560px]">
      <div className="flex flex-col items-center justify-center gap-10">
        {token ? (
          <>
            <h1 className="text-xl">
              Hello <span className="italic bold">{userName}</span>,
            </h1>
            <h1 className="text-2xl">Welcome to Application page</h1>
            <div className="flex ">
              <button
                className="px-4 py-2 mx-2  bg-indigo-500 text-white rounded-md focus:outline-none disabled:bg-opacity-50 disabled:cursor-not-allowed"
                onClick={() => setIsModalOpen(true)}
              >
                Edit Username
              </button>
              <button
                className="px-4 py-2 mx-2  bg-indigo-500 text-white rounded-md focus:outline-none disabled:bg-opacity-50 disabled:cursor-not-allowed"
                onClick={handleLogOut}
              >
                Logout
              </button>
            </div>
            {isModalOpen && (
              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                userId={userId}
                onUsernameUpdate={handleUsernameUpdate}
              ></Modal>
            )}
          </>
        ) : (
          <>
            <h1 className="text-2xl">Sorry! You are not authorized.</h1>
            <p>Please login or sign up to access this page</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Welcome;
