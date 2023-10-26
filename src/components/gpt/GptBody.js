import React, { useContext, useState } from "react";
import FlightContext from "../../state/FlightContext";
import GptPrompt from "./GptPrompt";
import PromptContext from "../../state/PromptContext";
import GptDetails from "./GptDetails";

const GptBody = () => {
  const [promptData, setPromptData] = useState(null);
  return (
    <div>
      <PromptContext.Provider value={{ promptData, setPromptData }}>
        <GptPrompt />
        <GptDetails />
      </PromptContext.Provider>
    </div>
  );
};

export default GptBody;
