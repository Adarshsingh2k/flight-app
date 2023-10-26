import React, { useContext, useState } from "react";
import FlightContext from "../../state/FlightContext";
import GptPrompt from "./GptPrompt";
import PromptContext from "../../state/PromptContext";
import GptDetails from "./GptDetails";
import FlightPrice from "./FlightPrice";
import FlightsDisplayComponent from "../FlightsDisplayComponent";

const GptBody = () => {
  const [promptData, setPromptData] = useState(null);
  return (
    <div>
      <PromptContext.Provider value={{ promptData, setPromptData }}>
        <GptPrompt />
        <div className="flex flex-row w-[100%]">
          <GptDetails />

          <FlightPrice />
          {/* <FlightsDisplayComponent /> */}
        </div>
      </PromptContext.Provider>
    </div>
  );
};

export default GptBody;
