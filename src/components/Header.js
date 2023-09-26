import React, { useContext } from "react";
import logo from "../assets/g-removebg-preview.png";
import UserContext from "../state/UserContext";

const Header = () => {
  const { user, logout } = useContext(UserContext);
  return (
    <div className="bg-blue-800 shadow-lg flex justify-between text-white   p-2">
      <img src={logo} alt="logo" className=" w-[201px]" />
      <div>
        {!user ? (
          <button className="border border-blue-400 hover:bg-white hover:border-black font-semibold  hover:text-black cursor-pointer rounded-lg p-2 mt-1 mx-2">
            Login
          </button>
        ) : (
          <button
            onClick={logout}
            className="border border-blue-400 hover:bg-white hover:border-black font-semibold  hover:text-black cursor-pointer rounded-lg p-2 mt-1 mx-2"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
