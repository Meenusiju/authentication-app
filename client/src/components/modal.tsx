import React from "react";
import axios from "axios";
import { useState } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUsernameUpdate: (newUsername: string) => void;
  userId: string;
};

export const Modal = ({
  isOpen,
  onClose,
  userId,
  onUsernameUpdate,
}: ModalProps) => {
  const API_URI = "http://localhost:3000";
  const [userName, setUserName] = useState("");
  if (!isOpen) return null;

  const updateUserName = async () => {
    try {
      const bodyParameters = {
        _id: userId,
        user: { username: userName },
      };
      const res = await axios.post(`${API_URI}/edit`, bodyParameters);
      const updatedUsername = res.data.user.username;
      onUsernameUpdate(updatedUsername);
    } catch (error) {
      console.error("Error during update:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserName();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
      <div className="fixed inset-0 transition-opacity bg-black opacity-60"></div>
      <div className="relative z-20 max-w-lg p-6 mx-auto bg-white rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-[12px] right-0 p-2 mt-2 mr-2 text-lg font-semibold text-gray-600 cursor-pointer focus:outline-none"
        >
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <input
            className="border border-gray-400 p-2 mb-4 w-[360px] rounded-md"
            type="name"
            placeholder="Enter new username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button
            className="px-4 py-2 mx-2 bg-indigo-500 text-white rounded-md focus:outline-none disabled:bg-opacity-50 disabled:cursor-not-allowed"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
