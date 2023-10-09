import { useContext } from "react";
import UserContext from "../state/UserContext";
import FlightSearchComponent from "./FlightSearchComponent";
import FlightsDisplayComponent from "./FlightsDisplayComponent";
import FlightContext from "../state/FlightContext";

const Home = () => {
  const { user } = useContext(UserContext);
  const { flightData } = useContext(FlightContext);
  return (
    <div>
      <FlightSearchComponent />
      <FlightsDisplayComponent />
    </div>
  );
};

export default Home;
