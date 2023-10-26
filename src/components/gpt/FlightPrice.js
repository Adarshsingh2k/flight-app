import React, { useContext, useRef, useState } from "react";

import { debounce } from "lodash";
import FlightSearchComponent from "../FlightSearchComponent";
import FlightContext from "../../state/FlightContext";
import { getAmadeusData } from "../../utils/getAmadeusData";
import PromptContext from "../../state/PromptContext";
import FlightModal from "./FlightModal";
import axios from "axios";

const FlightPrice = () => {
  const { flightData, setFlightData } = useContext(FlightContext);
  const { promptData } = useContext(PromptContext);

  const { origin } = flightData;
  console.log(origin);

  const [destination, setDestination] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const from = useRef(null);
  const to = useRef(null);
  const deptDate = useRef(null);

  let source; // Define the cancellation source outside the function

  const fetchIATACode = debounce(async (keyword) => {
    try {
      if (source) {
        source.cancel("A new request was made. Cancelling previous request.");
      }

      const { out } = getAmadeusData({
        keyword: keyword,
        page: 1,
        city: true,
        airport: true,
      });

      try {
        const response = await out;
        const data = response.data;
        console.log(data);

        const suggestions = data.data.map((item) => ({
          iataCode: item.iataCode,
          name: item.name,
        }));

        setSuggestions(suggestions);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error fetching IATA code", error);
        }
      }
    } catch (error) {
      console.error("Error fetching IATA code", error);
    } finally {
      setLoading(false);
    }
  }, 500);

  //   const fetchIATACode = debounce(async (keyword) => {
  //     try {
  //       const data = await getAmadeusData({
  //         keyword: keyword,
  //         page: 1,
  //         city: true,
  //         airport: true,
  //       });
  //       console.log(data);

  //       const suggestions = data.data.map((item) => ({
  //         iataCode: item.iataCode,
  //         name: item.name,
  //       }));

  //       setSuggestions(suggestions);

  //       // You can then set this data to some state, or use it directly.
  //     } catch (error) {
  //       console.error("Error fetching IATA code", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }, 500);

  const handleSuggestionClick = (suggestion) => {
    // Set the selected suggestion in the destination input
    setDestination(suggestion.iataCode);

    // Clear the suggestions
    setSuggestions([]);
  };

  const handleSearch = async () => {
    const origin = from.current.value.toUpperCase();
    const destination = to.current.value.toUpperCase();
    const departureDate = deptDate.current.value;

    const params = {
      originCode: origin,
      destinationCode: destination,
      dateOfDeparture: departureDate,
      returnDate: "",
      adults: 1,
    };

    const queryString = Object.keys(params)
      .filter(
        (key) =>
          params[key] !== undefined &&
          params[key] !== null &&
          params[key] !== ""
      )
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    const urlWithParams = `http://localhost:5000/api/flight/flight-search?${queryString}`;

    try {
      const response = await fetch(urlWithParams);
      const data = await response.json();
      //   console.log(data);
      data.origin = origin;
      console.log(data);
      setFlightData(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    promptData && (
      <div className="w-4/12 p-5 me-5">
        <div className="bg-red-500 to-90% shadow-xl rounded-xl flex flex-col text-white mx-auto justify-center items-center mt-[6%] w-[100%]">
          <h1 className=" font-bold">
            Check flights from{" "}
            <span className="italic text-black"> {origin}</span>
          </h1>

          <div className="text-black flex flex-col">
            <div className="flex flex-col mb-2">
              <label>From:</label>
              <input
                ref={from}
                className="italic ps-4 rounded-md border border-black"
                placeholder="From"
                value={origin}
              ></input>
            </div>

            <div className="flex flex-col mb-2">
              <label>To:</label>

              <input
                ref={to}
                className="italic ps-4 rounded-md border border-black"
                placeholder="To"
                type="text"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  fetchIATACode(e.target.value);
                }}
              ></input>

              {/* Display the suggestions dropdown */}
              {loading && <div>Loading...</div>}
              {suggestions.length > 0 && (
                <div className="overflow-y-scroll h-12 bg-black  text-white rounded-md mt-3 p-2 opacity-75">
                  <ul>
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.iataCode}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion.iataCode} - {suggestion.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex flex-col mb-2">
              <label>Departure Date:</label>
              <input
                ref={deptDate}
                className="italic ps-4 rounded-md border border-black"
                type="date"
              ></input>
            </div>

            <button
              onClick={handleSearch}
              className="border text-white border-white rounded-lg bg-black my-4 font-bold text-lg"
            >
              Check
            </button>

            <FlightModal isOpen={isModalOpen} onClose={closeModal} />
          </div>
        </div>
      </div>
    )
  );
};

export default FlightPrice;
