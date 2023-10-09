import React, { useContext, useEffect, useState } from "react";
import FlightContext from "../state/FlightContext";

const FlightsDisplayComponent = () => {
  const { flightData, setFlightData } = useContext(FlightContext);
  const [logos, setLogos] = useState({});
  console.log(flightData);
  const { data, dictionaries } = flightData;
  const { aircraft, carriers } = dictionaries || {};

  console.log(data);

  const fetchLogo = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/flight/flight-logo?id=${id}`
      );
      const data = await response.json();
      setLogos((prevLogos) => ({ ...prevLogos, [id]: data.logo }));
    } catch (error) {
      console.error("Error fetching the logo:", error);
    }
  };

  useEffect(() => {
    data?.forEach((flight) => {
      fetchLogo(flight?.itineraries[0]?.segments[0]?.carrierCode); // Call fetchLogo for each flight id
    });
  }, [flightData]);

  const formatDuration = (duration) => {
    const hoursMatch = duration.match(/(\d+)H/);
    const minutesMatch = duration.match(/(\d+)M/);

    let hours = hoursMatch ? hoursMatch[1] : "0";
    let minutes = minutesMatch ? minutesMatch[1] : "0";

    if (hours === "0" && minutes === "0") return duration; // Return original string if no match is found

    return `${hours} h : ${minutes} m`;
  };

  return (
    data && (
      <div className="text-black w-[80%] flex mx-auto  flex-col mt-5">
        {data?.map((flight) => (
          <div
            key={flight.id}
            className="bg-blue-100 rounded-lg shadow-md  w-[100%] my-2 p-3 flex "
          >
            <div className="flex w-2/12">
              {" "}
              <img
                src={logos[flight?.itineraries[0]?.segments[0]?.carrierCode]}
                alt="Airline Logo"
                className="me-5 rounded h-[64px]"
              />
              <div className="flex flex-col">
                <p className="text-base font-semibold">
                  {carriers[flight?.itineraries[0]?.segments[0]?.carrierCode]}{" "}
                </p>
                <em className="text-xs">
                  {
                    aircraft[
                      flight?.itineraries[0]?.segments[0]?.aircraft?.code
                    ]
                  }
                </em>
              </div>
            </div>{" "}
            <div className="flex  justify-around mt-5 w-[100%]">
              <div>
                {flight?.itineraries[0]?.segments[0]?.departure?.iataCode}
              </div>

              <div>
                {formatDuration(
                  flight?.itineraries[0]?.duration.replace("PT", "")
                )}
              </div>

              <div>
                {flight?.itineraries[0]?.segments[0]?.arrival?.iataCode}
              </div>
              <div className="font-bold">
                ₹
                {Math.round(
                  flight?.travelerPricings[0]?.price?.total * 87.91
                ).toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default FlightsDisplayComponent;
