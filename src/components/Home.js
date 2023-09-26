import { useContext } from "react";
import UserContext from "../state/UserContext";

const Home = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <button type="button" className="btn">
        Base class
      </button>
      <h1>{user.email}</h1>
    </div>
  );
};

export default Home;
