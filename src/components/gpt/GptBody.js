import React, { useContext } from "react";
import FlightContext from "../../state/FlightContext";
import GptPrompt from "./GptPrompt";

const GptBody = () => {
  return (
    <div>
      <GptPrompt />
    </div>
  );
};

export default GptBody;
