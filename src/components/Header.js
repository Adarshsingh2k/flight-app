import React, { useContext, useState } from "react";
import logo from "../assets/g-removebg-preview.png";
import UserContext from "../state/UserContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import GptBody from "./gpt/GptBody";

const Header = () => {
  const [isGpt, setIsGpt] = useState(false);

  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsGpt(!isGpt); // Toggle the isGpt state
    navigate(isGpt ? "/body" : "/gpt-search"); // Navigate based on the toggled state
  };
  return (
    <div className="bg-blue-800 shadow-lg flex justify-between text-white   p-2">
      <img src={logo} alt="logo" className=" w-[201px]" />
      <div>
        {!user ? (
          <button className="border border-blue-400 hover:bg-white hover:border-black font-semibold  hover:text-black cursor-pointer rounded-lg p-2 mt-1 mx-2">
            Login
          </button>
        ) : (
          <div>
            <span>👋 {user.displayName.split(" ")[0]}! </span>

            <button
              onClick={handleToggle}
              className="border border-green-400 text-green-400 hover:bg-white hover:border-black font-semibold  hover:text-black cursor-pointer rounded-lg p-2 mt-1 mx-2"
            >
              {isGpt ? "✈ Search" : "🧳 GPT"}
            </button>

            <button
              onClick={logout}
              className="border border-blue-400 hover:bg-white hover:border-black font-semibold  hover:text-black cursor-pointer rounded-lg p-2 mt-1 mx-2"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
