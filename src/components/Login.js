import { useContext } from "react";
// import { auth, provider } from "../utils/firebase";
import UserContext from "../state/UserContext";
import { useNavigate } from "react-router-dom";
import { GOOGLE_LOGO } from "../utils/constant";

const Login = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      await login();
      navigate("/body");
    } catch (error) {
      console.error("Login failed:", error);
      // Optionally show an error message to the user
    }
  };
  return (
    <div className="flex mt-[15%] md:mt-[8%] items-center justify-center">
      <div className="bg-slate-200 w-[85%] md:w-[35%] flex flex-col p-3  items-center justify-center rounded-lg shadow-xl">
        <h1 className="text-3xl font-semibold">Welcome to FlyNow</h1>
        <em className="m-4">Your Passport to the Skies 🌍✈️</em>
        <p className="text-center text-lg p-4">
          Dive into a world where booking flights is seamless, personalized, and
          reliable. Join us in redefining your travel journey. Log in and book
          flight with FlyNow.
        </p>

        <div className="flex flex-row bg-black ps-1 rounded-md mt-4 ">
          <img
            className="w-[30px] h-[30px] mt-3 rounded"
            src={GOOGLE_LOGO}
            alt="g_logo"
          ></img>
          <button onClick={handleLogin} className="  text-lg p-3  text-white">
            Login With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
