import React, { useState, useEffect } from "react";

export type UserDataProps = {
  username?: string;
  email: string;
  password: string;
};
export type UserFormProps = {
  onSubmit: (data: UserDataProps) => void;
  isLogin?: boolean;
};

export const UserForm: React.FC<UserFormProps> = ({ onSubmit, isLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ username, email, password });
  };

  useEffect(() => {
    setIsDisabled(!(username || (email && password)));
  }, [username, email, password]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center">
        {!isLogin && (
          <input
            className="border border-gray-400 p-2 mb-4 w-[360px] rounded-md"
            type="name"
            placeholder="Enter name name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}

        <input
          className="border border-gray-400 p-2 mb-4 w-[360px] rounded-md"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border border-gray-400 p-2 mb-4 w-[360px] rounded-md"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="px-4 py-2 mx-2 bg-indigo-500 text-white rounded-md focus:outline-none disabled:bg-opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isDisabled}
        >
          {isLogin ? "Login" : "Signup"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
