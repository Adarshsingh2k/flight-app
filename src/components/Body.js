import React, { useState } from "react";
import Home from "./Home";
import FlightContext from "../state/FlightContext";
import { Outlet } from "react-router-dom";

const Body = () => {
  // const [flightData, setFlightData] = useState({});
  return (
    // <FlightContext.Provider value={{ flightData, setFlightData }}>
    <div>
      <Home />
    </div>
    // </FlightContext.Provider>
  );
};

export default Body;
