import React, { useContext, useRef, useState } from "react";
import UserContext from "../state/UserContext";
import { validateField } from "../utils/flightSearchValidation";
import FlightContext from "../state/FlightContext";

const FlightSearchComponent = () => {
  const { user } = useContext(UserContext);
  const { flightData, setFlightData } = useContext(FlightContext);
  const from = useRef(null);
  const departure = useRef(null);
  const deptDate = useRef(null);
  const retDate = useRef(null);
  const travellerCount = useRef(null);

  const [errors, setErrors] = useState({});

  const handleValidation = (field, value) => {
    const errorMessage = validateField(field, value, deptDate.current.value);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMessage }));
  };

  const handleSearch = async () => {
    const origin = from.current.value.toUpperCase();
    const destination = departure.current.value.toUpperCase();
    const departureDate = deptDate.current.value;
    const returnDate = retDate.current.value;
    const adults = travellerCount.current.value;

    const params = {
      originCode: origin,
      destinationCode: destination,
      dateOfDeparture: departureDate,
      returnDate: returnDate,
      adults: adults,
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
      // const response = await fetch(
      //   `http://localhost:5000/flight-search?originCode=${origin}&destinationCode=${destination}&dateOfDeparture=${departureDate}`
      // );

      const response = await fetch(urlWithParams);
      const data = await response.json();
      //   console.log(data);
      setFlightData(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div className=" bg-slate-200 shadow-xl rounded-xl flex flex-col mx-auto justify-center items-center mt-[6%] w-[80%] px-4 py-4">
      <div className=" flex flex-col md:flex-row justify-around w-[100%]">
        <div className=" flex flex-col">
          <label>From</label>
          <input
            ref={from}
            type="text"
            required
            placeholder="BLR "
            className="border border-black rounded-sm p-1 uppercase"
            onChange={() => handleValidation("from", from.current.value)}
          />
          {errors.from && <small className="text-red-500">{errors.from}</small>}
        </div>

        <div className=" flex flex-col">
          <label>Arrival</label>

          <input
            ref={departure}
            required
            type="text"
            placeholder="VNS"
            className="border border-black rounded-sm p-1 uppercase"
            onChange={() =>
              handleValidation("departure", departure.current.value)
            }
          />
          {errors.departure && (
            <small className="text-red-500">{errors.departure}</small>
          )}
        </div>

        <div className=" flex flex-col">
          <label>Departure date</label>{" "}
          <input
            ref={deptDate}
            type="date"
            required
            className="border border-black rounded-sm p-1"
            onChange={() =>
              handleValidation("deptDate", deptDate.current.value)
            }
          />
          {errors.deptDate && (
            <small className="text-red-500">{errors.deptDate}</small>
          )}
        </div>

        <div className=" flex flex-col">
          <label>Return date</label>{" "}
          <input
            ref={retDate}
            type="date"
            className="border border-black rounded-sm p-1"
            onChange={() => handleValidation("retDate", retDate.current.value)}
          />
          {errors.retDate && (
            <small className="text-red-500">{errors.retDate}</small>
          )}
        </div>

        <div className=" flex flex-col">
          <label>Traveller</label>{" "}
          <input
            ref={travellerCount}
            type="text"
            required
            placeholder="0"
            className="border border-black rounded-sm p-1"
            defaultValue={1}
            onChange={() =>
              handleValidation("travellerCount", travellerCount.current.value)
            }
          ></input>
          {errors.travellerCount && (
            <small className="text-red-500">{errors.travellerCount}</small>
          )}
        </div>
      </div>
      <button
        disabled={Object.values(errors).some((error) => error)}
        onClick={handleSearch}
        className="border bg-blue-700 text-white w-[80px] rounded-lg px-3 py-2 text-lg mt-5"
      >
        Search
      </button>
    </div>
  );
};

export default FlightSearchComponent;
