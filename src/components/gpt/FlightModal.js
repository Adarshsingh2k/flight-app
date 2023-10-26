import React from "react";
import FlightsDisplayComponent from "../FlightsDisplayComponent";

const FlightModal = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 overflow-y-auto ${
        isOpen ? "" : "hidden"
      } w-[100%] bg-opacity-75 bg-black`}
    >
      <div className="flex items-center justify-center">
        <div className="w-[100%] p-4 rounded shadow-lg">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 p-3 text-white hover:text-red-400"
          >
            Close
          </button>
          <FlightsDisplayComponent />
        </div>
      </div>
    </div>
  );
};

export default FlightModal;
